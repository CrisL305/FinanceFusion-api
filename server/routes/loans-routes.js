const router = require('express').Router();
const LoansController = require('../controllers/LoansController');

//Retrieves all loan data from the user
router.get("/:id", LoansController.getLoansByUserId);

//Adds new loan data to an account
router.post("/:id", LoansController.createLoan);

//Updates loan information
router.put("/:id/:loan_id", LoansController.updateLoan);

//Deletes loan information
router.delete("/:id/:loan_id", LoansController.deleteLoan);

module.exports = router;