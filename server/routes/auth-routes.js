const router = require("express").Router();

//Registers a new user
router.post('/', (_req, res) => {
    //This implementation is to make sure the endpoint POST works
    res.send('You have reached the registration POST');
})

router.post('/', (_req, res) => {
    //This implementation is to make sure the endpoint POST works
    res.send('You have reached the login POST');
})

module.exports = router;