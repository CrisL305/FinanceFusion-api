const router = require('express').Router();

//Retrieves all transactions across connected accounts
router.get("/", (_req, res) => {
    //This implemantation is to make sure the endpoint GET works
    res.send("You have reached the transaction GET List");
});

//Adds a new transaction to an account
router.post("/", (_req, res) => {
    //This implemantation is to make sure the endpoint POST works
    res.send("You have reached the transaction POST");
});


module.exports = router;