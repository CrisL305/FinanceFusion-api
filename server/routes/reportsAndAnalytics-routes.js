const router = require('express').Router();

//Retrieves data for the user and creates report charts and analyses the best course of action.
router.get("/", (_req, res) => {
    //This implemantation is to make sure the endpoint GET works
    res.send("You have reached the reports and analytics GET List");
});

module.exports = router;