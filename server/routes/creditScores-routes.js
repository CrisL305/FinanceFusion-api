const router = require('express').Router();
const CreditScoresController = require('../controllers/CreditScoresController');

//Retrieves credit score data from the user
router.get("/user/:userId", CreditScoresController.getCreditScoreByUserId);

//Adds credit score data to an account
router.post("/", CreditScoresController.createCreditScore);

//Updates credit score information
router.put("/:scoreId", CreditScoresController.updateCreditScore);

//Deletes credit score information
router.put("/:scoreId", CreditScoresController.deleteCreditScore);

module.exports = router;