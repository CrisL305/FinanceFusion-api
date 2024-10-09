const knex = require('knex')(require('../knexfile'));

//Get all budgets for a user
exports.getBudgetsByUserId = async (req, res) => {
    try{
        const budgets = await knex('Budgets').where({ id: req.params.id });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching budgets' });
    }
};

//Create new budget
exports.createBudget = async (req, res) => {
    try{
        const { id, category, budgeted_amount, actual_spent } = req.body;
        const [newBudgetId] = await knex('Budgets').insert({ id, category, budgeted_amount, actual_spent });
        res.status(201).json({ budget_id: newBudgetId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating budget' });
    }
};

//Update budget
exports.updateBudget = async (req, res) => {
    try{
        const { category, budgeted_amount, actual_spent } = req.body;
        const budget = await knex('Budgets').where({ budget_id: req.params.budgetId }).first();
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        await knex('Budgets').where({ budget_id: req.params.budgetId }).update({ category, budgeted_amount, actual_spent });
        res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating budget' });
    }
};

//Delete budget
exports.deleteBudget = async (req, res) => {
    try{
        const budget = await knex('Budgets').where({ budget_id: req.params.budgetId }).first();
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        await knex('Budgets').where({ budget_id: req.params.budgetId }).del();
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting budget' });
    }
};