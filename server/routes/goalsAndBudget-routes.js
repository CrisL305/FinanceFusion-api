const router = require('express').Router();
const GoalsController = require('../controllers/GoalsController');
const BudgetsController = require('../controllers/BudgetsController');

//Retrieves all financial goals for the user
router.get("/user/:userId", GoalsController.getGoalsByUserId);

//Adds a new financial goal to an account
router.post("/", GoalsController.createGoal);

//Updates the user's goal
router.put("/:goalId", GoalsController.updateGoal);

//Delete the user's goal
router.put("/:goalId", GoalsController.deleteGoal);

//==================Budget================

//Retrieves all budgets from the user
router.get("/user/:userId", BudgetsController.getBudgetsByUserId);

//Adds a new budget to an account
router.post("/", BudgetsController.createBudget);

//Updates the user's budget
router.put("/:budgetId", BudgetsController.updateBudget);

//Delete the user's budget
router.put("/:budgetId", BudgetsController.deleteBudget);


module.exports = router;