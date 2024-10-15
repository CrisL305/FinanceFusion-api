const router = require('express').Router();
const GoalsController = require('../controllers/GoalsController');


//Retrieves all financial goals for the user
router.get("/:id", GoalsController.getGoalsByUserId);

//Adds a new financial goal to an account
router.post("/:id", GoalsController.createGoal);

//Updates the user's goal
router.put("/:id/:goal_id", GoalsController.updateGoal);

//Delete the user's goal
router.delete("/:id/:goal_id", GoalsController.deleteGoal);

module.exports = router;