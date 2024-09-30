const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

//Retrives all users.
router.get('/', UsersController.getAllUsers);

//Retrives a specific user by user_id.
router.get('/:id', UsersController.getUserById);

//Creates a new user.
router.post('/', UsersController.createUser);

//Updates a user by user_id.
router.put('/', UsersController.updateUser);

//Deletes a user by user_id.
router.delete('/', UsersController.deleteUser);

module.exports = router;
