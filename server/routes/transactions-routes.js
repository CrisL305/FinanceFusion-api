const router = require('express').Router();
const TransactionController = require('../controllers/TransactionController');

//Route to get all transactions
router.get('/', TransactionController.getAllTransactions);

//Route to get all transactions for a specific user
router.get('/:id', TransactionController.getUserTransactions);

//Retrieves all transactions across connected accounts
router.get("/account/:account_id", TransactionController.getTransactionByAccountId);

//Adds a new transaction to an account
router.post("/account/:account_id", TransactionController.createTransaction);

//Updates a transaction on an account
router.put("/account/:account_id/:transaction_id", TransactionController.updateTransaction);

//Deletes a transaction on an account
router.delete("/account/:account_id/:transaction_id", TransactionController.deleteTransaction);

module.exports = router;