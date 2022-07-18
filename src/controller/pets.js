const petsService = require('../services/pets')
const usersService = require('../services/users')

exports.getPets = async (res) => {
  try {
    const pets = await petsService.getPetList()
    return pets
  } catch (err) {
    console.log('catController.getPets err: ', err)
    throw err
  }
}

exports.getPetById = async (res, catId) => {
  try {
    const cat = petsService.getPetData(res, catId)
    return cat
  } catch (err) {
    console.log('catController.getPetById err: ', err)
    throw err
  }
}

exports.createPet = async (req, res) => {
  try {
    const catData = req.body
    const newPet = await petsService.createNewPet(catData)
    return newPet
  } catch (err) {
    console.log('catController.createPet err: ', err)
    throw err
  }
}

exports.updatePetById = async (req, res, petId) => {
  try {
    const updateData = req.body
    const cat = await petsService.getPetData(res, petId)
    const { ownerId } = updateData
    if(ownerId) {
       // Check that user exists
      await usersService.getUserData(res, ownerId)
    }
    const updatedPet = await petsService.updatePet(cat, updateData)
    return updatedPet
  } catch (err) {
    console.log('catController.updatePetById err: ', err)
    throw err
  }
}

exports.deletePetById = async (res, petId) => {
  try {
    const deletedResult = await petsService.deletePet(petId)
    return { id: deletedResult }
  } catch (err) {
    console.log('catController.deletePetById err: ', err)
    throw err
  }
}
