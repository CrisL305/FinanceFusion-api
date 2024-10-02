const knex = require('knex')(require('../knexfile'));

//Get all accounts for a user
exports.getAccountsByUserId = async (req, res) => {
    try {
        const accounts = await knex('Accounts').where({ user_id: req.params.userId });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching accounts'});
    }
};

//Create new account
exports.createAccount = async (req, res) => {
    try{
    const { user_id, bank_name, account_type, balance, account_number } = req.body;
    const [newAccountId] = await knex('Accounts').insert({ user_id, bank_name, account_type, balance, account_number });
    res.status(201).json({ account_id: newAccountId });
    } catch (error) {
    res.status(500).json({ error: 'Error fetching account'});
    }
};

//Create account
exports.updateAccount = async (req, res) => {
    try {
        const { bank_name, account_type, balance, account_number } = req.body;
        const account = await knex('Accounts').where({ account_id: req.params.accountId }).first();
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await knex('Accounts').where({ account_id: req.params.accountId }).update({ bank_name, account_type, balance, account_number });
        res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating account' });
    }
};

//Delete account
exports.deleteAccount = async (req, res) => {
    try{
        const account = await knex('Accounts').where({ account_id: req.params.accountId }).first();
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await knex('Accounts').where({ account_id: req.params.accountId }).del();
        res.status(200).json({ message: `Account deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account'});
    }
};