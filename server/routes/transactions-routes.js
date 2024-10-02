const router = require('express').Router();
const TransactionController = require('../controllers/TransactionController');

//Retrieves all transactions across connected accounts
router.get("/account/:accountId", TransactionController.getTransactionByAccountId);

//Adds a new transaction to an account
router.post("/", TransactionController.createTransaction);

//Updates a transaction on an account
router.put("/:transactionId", TransactionController.updateTransaction);

//Deletes a transaction on an account
router.delete("/:transactionId", TransactionController.deleteTransaction);

module.exports = router;