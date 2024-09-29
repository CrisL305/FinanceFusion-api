const router = require('express').Router();

//Retrieves all chart data for the users from each category
router.get("/", (_req, res) => {
    //This implemantation is to make sure the endpoint GET works
    res.send("You have reached the homeDashboard GET List");
});

module.exports = router;