const router = require('express').Router();

//Retrieves all financial goals for the user
router.get("/", (_req, res) => {
    //This implemantation is to make sure the endpoint GET works
    res.send("You have reached the goals GET List");
});

//Adds a new financial goal to an account
router.post("/", (_req, res) => {
    //This implemantation is to make sure the endpoint POST works
    res.send("You have reached the goals POST");
});

//Retrieves the user's budget for different categories
router.get("/", (_req, res) => {
    //This implemantation is to make sure the endpoint GET works
    res.send("You have reached the budgets GET List");
});

module.exports = router;