const knex = require('knex')(require('../knexfile'));

//Get all loans for a user
exports.getLoansByUserId = async (req, res) => {
    try {
        const loans = await knex('Loans').where({ user_id: req.params.userId });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loans' });
    }
};

//Create new loan
exports.createLoan = async (req, res) => {
    try {
        const { user_id, loan_type, outstanding_balance, interest_rate, payment_schedule } = req.body;
        const [newLoanId] = await knex('Loans').insert({ user_id, loan_type, outstanding_balance, interest_rate, payment_schedule });
        res.status(201).json({ loan_id: newLoanId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating loans' });
    }
};

//Update loan
exports.updateLoan = async (req, res) => {
    try {
        const { loan_type, outstanding_balance, interest_rate, payment_schedule } = req.body;
        const loan = await knex('Loans').where({ loan_id: req.params.loanId }).first();
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        await knex('Loans').where({ loan_id: req.params.loanId }).update({ loan_type, outstanding_balance, interest_rate, payment_schedule });
        res.status(200).json({ message: 'Loan updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating loans' });
    }
};

//Delete loan
exports.deleteLoan = async (req, res) => {
    try {
        const loan = await knex('Loans').where({ loan_id: req.params.loanId }).first();
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        await knex('Loans').where({ loan_id: req.params.loanId }).del();
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting loans' });
    }
};