const router = require('express').Router();
const BudgetsController = require('../controllers/BudgetsController');

//Retrieves all budgets from the user
router.get("/:id", BudgetsController.getBudgetsByUserId);

//Adds a new budget to an account
router.post("/:id", BudgetsController.createBudget);

//Updates the user's budget
router.put("/:id/:budget_id", BudgetsController.updateBudget);

//Delete the user's budget
router.delete("/:id/:budget_id", BudgetsController.deleteBudget);

module.exports = router;