const router = require("express").Router();
const AccountsController = require('../controllers/AccountsController');

//Retrives all connected accounts for the authenticated user.
router.get('/', AccountsController.getAccountsByUserId);

//Adds a new bank or credit card account
router.post('/', AccountsController.createAccount)

//Deletes a connected account
router.delete('/:id', (_req, res) => {
    //This is the implementation to make sure the endpoint works for DELETE
    res.send('You have reached /api/accounts ID DELETE');
});

module.exports = router;