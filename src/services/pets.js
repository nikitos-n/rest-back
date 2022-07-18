const { HttpError } = require('../utils/requestResponseErrors')
const { cache } = require('../utils/cacheData')
const models = require('../model')

exports.getPetList = async () => {
  const cats = await catModel.fetchAllPets()
  return cats
}

exports.getPetData = async (res, catId) => {
  const cat = await cache(catId, catModel.fetchPetById, res)
  if (!cat) {
    console.log('catService.getPetData err')
    throw new HttpError('Pet not found', 404)
  }
  return cat
}

exports.createNewPet = async (catData) => {
try{
  const { userId, ...params } = catData

  const user = await Users.findOne({
    where: {
      id: userId
    }
  })

  console.log('user ', user)

  const pet = await Pets.create({ ...params }) 
  await user.addPet(pet)
  await user.save()

  return { catData }
} catch (err) {
  console.log('petsService.createUser err: ', err)
  throw err
}
}

exports.updatePet = async (cat, updateData) => {
  const updatedPet = { ...cat, ...updateData }
  const updateResult = await catModel.update(updatedPet)
  if (!updateResult) {
    console.log('catService.updatePet err')
    throw new HttpError('Pet not found', 404)
  }
  return updatedPet
}

exports.deletePet = async (catId) => {
  const deleteResult = await catModel.delete(catId)
  if (!deleteResult) {
    console.log('catService.deletePet err')
    throw new HttpError('Pet not found', 404)
  }
  return catId
}
