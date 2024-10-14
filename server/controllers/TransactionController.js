const knex = require('knex')(require('../knexfile'));

//Get all transactions for an account
exports.getTransactionByAccountId = async (req, res) => {
    try{
        const transactions = await knex('Transactions').where({ account_id: req.params.account_id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

//Create new transaction
exports.createTransaction = async (req, res) => {
    try{
        const { account_id, amount, transaction_type, category, description, date } = req.body;
        const [newTransactionId] = await knex('Transactions').insert({ account_id, amount, transaction_type, category, description, date });
        res.status(201).json({ transaction_id: newTransactionId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating transaction' });
    }
};

//Update transaction
exports.updateTransaction = async (req, res) => {
    const { transaction_id } = req.params;
    const { amount, transaction_type, category, description, date } = req.body;

    try{
        const transaction = await knex('Transactions').where({ transaction_id }).first();
        //Guard clause
        if (!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }

        //Format the date to YYYY-MM-DD if it exists
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null;

        await knex('Transactions').where({ transaction_id }).update({ 
            amount, 
            transaction_type, 
            category, 
            description,
            date: formattedDate 
        });

        res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Error updating transaction' });
    }
};

//Delete transaction
exports.deleteTransaction = async (req, res) => {
    try{
        const transaction = await knex('Transactions').where({ transaction_id: req.params.transaction_id }).first();
        //Guard clause
        if (!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }
        await knex('Transactions').where({ transaction_id: req.params.transaction_id }).del();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting transaction' });
    }
};