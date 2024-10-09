const router = require('express').Router();
const LoansController = require('../controllers/LoansController');

//Retrieves all loan data from the user
router.get("/:id", LoansController.getLoansByUserId);

//Adds new loan data to an account
router.post("/", LoansController.createLoan);

//Updates loan information
router.put("/:loanId", LoansController.updateLoan);

//Deletes loan information
router.put("/:loanId", LoansController.deleteLoan);

module.exports = router;