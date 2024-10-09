const knex = require('knex')(require('../knexfile'));

//Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await knex('Users').select('*');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users'});
    }
};

//Get user by ID
exports.getUserById = async (req, res) => {
    try{
    const user = await knex('Users').where({ id: req.params.id }).first();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ error: 'Error fetching user'});
    }
};

//Create new user
exports.createUser = async (req, res) => {
    try {
        const { github_id, avatar_url, name, email, password } = req.body;
        const [newUserId] = await knex('Users').insert({ github_id, avatar_url, name, email, password });
        res.status(201).json({ id: newUserId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

//Update user
exports.updateUser = async (req, res) => {
    try{
        const { github_id, avatar_url, name, email, password } = req.body;
        const user = await knex('Users').where({ id: req.params.id }).first();
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        await knex('Users').where({ id: req.params.id }).update({ github_id, avatar_url, name, email, password });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

//Delete user
exports.deleteUser = async (req, res) => {
    try{
        const user = await knex('Users').where({ id: req.params.id }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await knex('Users').where({ id: req.params.id }).del();
        res.status(200).json({ message: `User deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user'});
    }
};