const router = require("express").Router();
const AccountsController = require('../controllers/AccountsController');

//Retrives all connected accounts for the authenticated user.
router.get('/:id', AccountsController.getAccountsByUserId);

//Adds a new bank or credit card account
router.post('/', AccountsController.createAccount);

//Updates a connected account
router.put('/:accountId', AccountsController.updateAccount);

//Delete a connected account
router.delete('/:accountId', AccountsController.deleteAccount);

module.exports = router;