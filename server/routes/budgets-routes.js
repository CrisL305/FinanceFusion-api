const router = require('express').Router();
const BudgetsController = require('../controllers/BudgetsController');

//Retrieves all budgets from the user
router.get("/:id", BudgetsController.getBudgetsByUserId);

//Adds a new budget to an account
router.post("/", BudgetsController.createBudget);

//Updates the user's budget
router.put("/:budgetId", BudgetsController.updateBudget);

//Delete the user's budget
router.put("/:budgetId", BudgetsController.deleteBudget);

module.exports = router;