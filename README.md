# Project installation
- `./install_project.sh` - to init base project config



# REST Pets
- GET http://pets-applipetion.com/api/pet GET ALL PETS -> petController.getpets 
- GET http://pets-applipetion.com/api/pet/{id} GET PET -> petController.getCatById
- POST http://pets-applipetion.com/api/pet CREATE NEW PET -> petController.createCat (use DB)
- PUT http://pets-applipetion.com/api/pet/{id} UPDATE PET ->  petController.updateCat
- DELETE http://pets-applipetion.com/api/pet/{id} DELETE PET -> petController.deleteCatById

# REST Users
- GET http://pets-applipetion.com/api/user GET ALL USERS -> userController.getUsers
- GET http://pets-applipetion.com/api/user/{id} GET USER -> userController.getUserById
- POST http://pets-applipetion.com/api/user CREATE NEW USER -> userController.createUser (use DB)
- POST http://pets-applipetion.com/api/user/auth LOGIN USER -> userController.loginUser (use DB)
- PUT http://pets-applipetion.com/api/pet/{id} UPDATE USER -> userController.updateUser
- DELETE http://pets-applipetion.com/api/pet/{id} DELETE USER -> userController.deleteUserById
- DELETE http://pets-applipetion.com/api/pet DELETE USERS -> userController.deleteUsers
