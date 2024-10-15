const router = require("express").Router();
const AccountsController = require('../controllers/AccountsController');

//Retrives all connected accounts for the authenticated user.
router.get('/:id', AccountsController.getAccountsByUserId);

//Adds a new bank or credit card account
router.post('/:id', AccountsController.createAccount);

//Updates a connected account
router.put('/:id/:account_id', AccountsController.updateAccount);

//Delete a connected account
router.delete('/:id/:account_id', AccountsController.deleteAccount);

module.exports = router;