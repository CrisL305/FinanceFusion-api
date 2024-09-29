const router = require("express").Router();

//Retrives all connected accounts for the authenticated user.
router.get('/', (_req, res) => {
    //This is the implementation to make sure the endpoint works for GET
    res.send('You have reached the /api/accounts GET List');
});

//Adds a new bank or credit card account
router.post('/', (_req, res) =>{
    //This is the implementation to make sure the endpoint works for POST
    res.send('You have reached /api/accounts POST');
});

//Deletes a connected account
router.delete('/:id', (_req, res) => {
    //This is the implementation to make sure the endpoint works for DELETE
    res.send('You have reached /api/accounts ID DELETE');
});

module.exports = router;