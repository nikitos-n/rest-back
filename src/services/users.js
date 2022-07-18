const { v4: uuid } = require('uuid')
const { HttpError } = require('../utils/requestResponseErrors')
const { cache } = require('../utils/cacheData')
const models = require('../model')

const userModel = require('../model/user')
const catModel = require('../model/cat')

exports.checkDublicateUser = async (userData) => {
  const findUserResult = await Users.findOne({
    where: {
      email: userData.email
    }
  })
  if (findUserResult) {
    console.log('userService.checkDublicateUser err')
    throw new HttpError('User already exists', 409)
  }
}

exports.checkExistsUser = async (userData) => {
  const findUserResult = await Users.findOne({
    where: {
      email: userData.email
    }
  })
  if (!findUserResult) {
    console.log('userService.checkExistsUser err')
    throw new HttpError('User not found', 404)
  }
  return findUserResult.dataValues
}

exports.createNewUser = async (userData, hashedPassword) => {
  try {
    await Users.create({ ...userData, password: hashedPassword })
    return { data: userData }
  } catch (err) {
    console.log('userService.createNewUser err ', err)
    throw new HttpError('Create user error')
  }
}

exports.getUserList = async (searchParams) => {
  const { pageSize, pageNumber } = searchParams

  if ((!pageSize || !pageNumber) && Object.keys(searchParams).length) {
    console.log('userService.getUserList err')
    throw new HttpError('Bad request', 400) 
  }

  let users
  if (Object.keys(searchParams).length) {
    users = await userModel.fetchSomeUsers({ pageSize, pageNumber })
  } else {
    users = await userModel.fetchAllUsers()
  }

  return users
}

exports.getUserData = async (res, userId) => {
  const user = await cache(userId, userModel.fetchUserById, res)
  if (!user) {
    console.log('userService.getUserData err ', err)
    throw new HttpError('User not found', 404)
  }
  return user
}

exports.updateUser = async (user, updateData) => {
  const updatedUser = { ...user, ...updateData }
  const updateResult = await userModel.update(updatedUser)
  if (!updateResult) {
    console.log('userService.updateUser err')
    throw new HttpError('User not found', 404)
  }
  return updatedUser
}

exports.deleteUser = async (userId) => {
  const deleteResult = await userModel.delete(userId)
  if (!deleteResult) {
    console.log('userService.deleteUser err ', err)
    throw new HttpError('User not found', 404)
  }
  await catModel.deleteOwnerId(userId)
  return userId
}

exports.deleteUsers = async (deleteData) => {
  if (!deleteData) {
    console.log('userService.deleteUsers err ', err)
    throw new HttpError('User not found', 404)
  }
  const { usersId } = deleteData
  for (id of usersId) {
    await exports.deleteUser(id)
    await catModel.deleteOwnerId(id)
  }
  return usersId
}
