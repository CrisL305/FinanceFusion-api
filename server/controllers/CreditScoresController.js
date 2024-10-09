const knex = require('knex')(require('../knexfile'));

//Get credit score by user ID
exports.getCreditScoreByUserId = async (req, res) => {
    try {
        const creditScore = await knex('CreditScores').where({ id: req.params.id }).first();
        if (!creditScore) {
            return res.status(404).json({ message: 'Credit score not found' });
        }
        res.status(200).json(creditScore);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching credit score' });
    }
};

//Create new credit score
exports.createCreditScore = async (req, res) => {
    try {
        const { id, current_score, score_history, credit_utilization } = req.body;
        const [newScoreId] = await knex('CreditScores').insert({ id, current_score, score_history, credit_utilization });
        res.status(201).json({ score_id: newScoreId});
    } catch (error) {
        res.status(500).json({ error: 'Error creating credit score' });
    }
};

//Update credit score
exports.updateCreditScore = async (req, res) => {
    try {
        const { current_score, score_history, credit_utilization } = req.body;
        const creditScore = await knex('CreditScores').where({ score_id: req.params.userId }).first();
        if (!creditScore) {
            return res.status(404).json({ message: 'Credit score not found' });
        }
        await knex('CreditScore').where({ score_id: req.params.scoreId }).update({ current_score, score_history, credit_utilization });
        res.status(200).json({ message: 'Credit score updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating credit score' });
    }
};

//Delete credit score
exports.deleteCreditScore = async (req, res) => {
    try {
        const creditScore = await knex('CreditScores').where({ score_id: req.params.userId }).first();
        if (!creditScore) {
            return res.status(404).json({ message: 'Credit score not found' });
        }
        await knex('CreditScore').where({ score_id: req.params.scoreId }).del();
        res.status(200).json({ message: 'Credit score deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleted credit score' });
    }
};