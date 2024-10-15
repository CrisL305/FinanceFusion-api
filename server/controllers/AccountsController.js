const knex = require('knex')(require('../knexfile'));

//Get all accounts for a user
exports.getAccountsByUserId = async (req, res) => {
    try {
        const accounts = await knex('Accounts').where({ id: req.params.id });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching accounts'});
    }
};

//Create new account
exports.createAccount = async (req, res) => {
    try{
    const { id, bank_name, account_type, balance } = req.body;

    const account_number = generateAccountNumber();

    const [newAccountId] = await knex('Accounts').insert({ id, bank_name, account_type, balance, account_number })
    res.status(201).json({ account_id: newAccountId, account_number: account_number });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating account'});
    }
};

const generateAccountNumber = () => {
    const accountNumberLength = 10;
    let accountNumber = "";

    for (let i = 0; i < accountNumberLength; i++) {
        accountNumber += Math.floor(Math.random() * 10);        
    }

    return accountNumber;
}
//Create account
exports.updateAccount = async (req, res) => {
    try {
        const { account_id } = req.params;
        const { bank_name, account_type, balance, account_number } = req.body;
        const account = await knex('Accounts').where({ account_id }).first();
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await knex('Accounts').where({ account_id }).update({ bank_name, account_type, balance, account_number });
        res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating account' });
    }
};

//Delete account
exports.deleteAccount = async (req, res) => {
    try{
        const account = await knex('Accounts').where({ account_id: req.params.account_id }).first();
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await knex('Accounts').where({ account_id: req.params.account_id }).del();
        res.status(200).json({ message: `Account deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account'});
    }
};