const { parseQueryParams } = require('../utils/parseJsonData')
const authService = require('../services/auth')
const userService = require('../services/users')
const catModel = require('../model/cat')

exports.getUsers = async (req, res) => {
  try {
    const searchParams = parseQueryParams(req)
    const users = userService.getUserList(searchParams)
    return users
  } catch (err) {
    console.log('usersService.getUsers err: ', err)
    throw err
  }
}

exports.getUserById = async (res, userId) => {
  try {
    const user = await userService.getUserData(res, userId)
    const cats = await catModel.fetchCatByOwnerId(userId)
    user.cats = cats
    return user
  } catch (err) {
    console.log('usersService.getUserById err: ', err)
    throw err
  }
}

exports.createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body
    const hashedPassword = await authService.createPasswordHash(password)
    await userService.checkDublicateUser(userData)
    const newUser = await userService.createNewUser(userData, hashedPassword)
    return newUser
  } catch (err) {
    console.log('usersService.createUser err: ', err)
    throw err
  }
}

exports.loginUser = async (req, res) => {
  try {
    const userData = req.body
    const findUserResult = await userService.checkExistsUser(userData)
    const hashedPassword = await authService.createPasswordHash(userData.password)
    const token = await authService.checkAuthPassword(findUserResult, hashedPassword)
    return token
  } catch (err) {
    console.log('usersService.loginUser err: ', err)
    throw err
  }
}

exports.updateUserById = async (req, res, userId) => {
  try {
    const updateData = req.body
    const user = await userService.getUserData(res, userId)
    const { password, ...updatedUser } = await userService.updateUser(user, updateData)
    return updatedUser
  } catch (err) {
    console.log('usersService.updateUserById err: ', err)
    throw err
  }
}

exports.deleteUsers = async (req, res) => {
  try {
    const deleteData = req.body
    const deletedResult = await userService.deleteUsers(deleteData)
    return { usersId: deletedResult }
  } catch (err) {
    console.log('usersService.deleteUsers err: ', err)
    throw err
  }
}

exports.deleteUserById = async (req, res, userId) => {
  try {
    const deletedResult = await userService.deleteUser(userId)
    return { id: deletedResult }
  } catch (err) {
    console.log('usersService.deleteUserById err: ', err)
    throw err
  }
}
