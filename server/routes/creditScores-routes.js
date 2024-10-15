const router = require('express').Router();
const CreditScoresController = require('../controllers/CreditScoresController');

//Retrieves credit score data from the user
router.get("/:id", CreditScoresController.getCreditScoreByUserId);

//Adds credit score data to an account
router.post("/:id", CreditScoresController.createCreditScore);

//Updates credit score information
router.put("/:id/:score_id", CreditScoresController.updateCreditScore);

//Deletes credit score information
router.delete("/:id/:score_id", CreditScoresController.deleteCreditScore);

module.exports = router;