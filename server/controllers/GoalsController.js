const knex = require('knex')(require('../knexfile'));

//Get all goals for a user
exports.getGoalsByUserId = async (req, res) => {
    try {
        const goals = await knex('Goals').where({ id: req.params.id });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching goals' });
    }
};

//Create new goal
exports.createGoal = async (req, res) => {
    try {
        const { id, goal_type, target_amount, current_savings, deadline } = req.body;
        const [newGoalId] = await knex('Goals').insert({ id, goal_type, target_amount, current_savings, deadline });
        res.status(201).json({ goal_id: newGoalId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating goal' });
    }
};

//Update goal
exports.updateGoal = async (req, res) => {
    try {
        const { goal_type, target_amount, current_savings, deadline } = req.body;
        const goal = await knex('Goals').where({ goal_id: req.params.goalId }).first();
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        await knex('Goals').where({ goal_id: req.params.goalId }).update({ goal_type, target_amount, current_savings, deadline });
        res.status(200).json({ message: 'Goal updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating goal' });
    }
}

//Delete goal
exports.deleteGoal = async (req, res) => {
    try{
        const goal = await knex('Goals').where({ goal_id: req.params.goalId }).first();
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        await knex('Goals').where({ goal_id: req.params.goalId }).del();
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting goal' });
    }
};