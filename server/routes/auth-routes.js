const router = require("express").Router();

const passport = require('passport');

require('dotenv').config();

router.get('/github', passport.authenticate('github'));

//This is the endpoint that GitHub will redirect to after user responds on consent page
router.get(
    "/github/callback",
    passport.authenticate('github', {
        failureRedirect: `${process.env.CLIENT_URL}/auth-fail`,
    }),
    (_req, res) => {
        res.redirect(`${process.env.CLIENT_URL}profile`);
    }
);

// User profile endpoint that requires authentication
router.get('/profile', (req, res) => {
    if (req.user === undefined)
        return res.status(401).json({ message: 'Unauthorized' });
    res.status(200).json(req.user);
})

//Logout endpoint
router.get('/logout', (req, res) => {
    //Passport adds the logout method to request, it will end usesr session
    req.logout((error) => {
        //This callback function runs after the logout function
        if (error) {
            return res.status(500).json({message: "Server error, please try again later", error: error});
        }
        //Redirect the user back to client-side application
        res.redirect(process.env.CLIENT_URL);
    });
});

// router.get('/success-callback', (req, res) => {
//     if (req.user) {
//         res.status(200).json(req.user);
//     } else {
//         res.status(401).json({ message: 'User is not logged in'});
//     }
// });

// //Registers a new user
// router.post('/', (_req, res) => {
//     //This implementation is to make sure the endpoint POST works
//     res.send('You have reached the registration POST');
// })

// router.post('/', (_req, res) => {
//     //This implementation is to make sure the endpoint POST works
//     res.send('You have reached the login POST');
// })

module.exports = router;