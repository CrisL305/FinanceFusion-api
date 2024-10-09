const express = require('express');

//Middleware for creating a session id on server and a session cookie on client
const expressSession = require('express-session');

//cors package prevents CORS erros when using client side API calls
const cors = require('cors');

//Add http headers, small layer of security
const helmet = require('helmet');

//Passport library and Github strategy
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

//Knex instance
const knex = require('knex')(require('./knexfile'));

//Express app and also allows for app PORT to be optionally specified by an environment variable
const app = express();
const PORT = process.env.PORT || 5050;

//Middleware for creating the connection to user route
const usersRoutes = require('./routes/users-routes');

//Middleware for creating the connection to auth route
const authRoutes = require('./routes/auth-routes');

//Middleware for creating the connection to account route
const accountRoute = require('./routes/accounts-routes');

//Middleware for creating the connection to goalsAndBudgetingRoute route
const goalsRoute = require('./routes/goals-routes');

//Middleware for creating the connection to goalsAndBudgetingRoute route
const budgetsRoute = require('./routes/budgets-routes');

//Middleware for creating the connection to homeDashboardRoute route
const homeDashboardRoute = require('./routes/homeDashboard-routes');

//Middleware for creating the connection to reportsAndAnalysisRoute route
const reportsAndAnalysisRoute = require('./routes/reportsAndAnalytics-routes');

//Middleware for creating the connection to transactionsRoute route
const transactionsRoute = require('./routes/transactions-routes');

//Middleware for creating the connection to loanRoute route
const loanRoute = require('./routes/loans-routes');

//Middleware for creating the connection to creditScoresRoutes route
const creditScoresRoutes = require('./routes/creditScores-routes');

//Require .env files for environment variables (keys and secrets)
require('dotenv').config();

//Enables req.body middleware
app.use(express.json());

//Initialize HTTP Headers middleware
app.use(helmet());

//Enable CORS (with additional config options required for cookies)
app.use(
    cors(
        {
            origin: true,
            credentials: true,
        }
    )
);

//Include express-session middleware (with additional config options required for Passport session)
app.use(
    expressSession(
        {
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        }
    )
);

// ============ Passport Config =========

//Initializing Passport middleware
app.use(passport.initialize());

app.use(passport.session());

//Initializing GitHub strategy middleware
//Adding multiple strategies with `passport.use` syntax
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        (_accessToken, _refreshToken, profile, done) => {
            //This implementation doesn't require an access or refresh tokens.
            //Profile parameter will be the profile object we get back from GitHub.
            console.log('GitHub profile:', profile);

            //This code checks if we already have this user in our DB
            knex('Users')
                .select('id')
                .where({ github_id: profile.id })
                .then((user) => {
                    if (user.length) {
                        // If user is found, pass the user object to serialize function
                        done(null, user[0]);
                    } else {
                        //If user isn't found, we create a record
                        knex('Users')
                        .insert({
                            github_id: profile.id,
                            avatar_url: profile._json.avatar_url,
                            username: profile.username,
                        })
                        .then((userId) => {
                            //Passes the user object to serialize function
                            done(null, { id: userId[0] });
                        })
                        .catch((err) => {
                            console.log('Error creating a user', err);
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error fetching a user', err);
                });
        }
    )
);

// `serializeUser` determines which data of the auth user object should be stored in the session
// The data comes from `done` function of the strategy
// The result of the method is attached to the session as `req.session.passport.user = 12345`
passport.serializeUser((user, done) => {
    console.log('serializeUser (user object):', user);

    //Stores only the user id in session
    done(null, user.id);
});

// `deserializeUser` receives a value sent from `serializeUser` `done` function
// We can then retrieve full user information from our database using the userId
passport.deserializeUser((userId, done) => {
    console.log('deserializeUser (user id):', userId);

      // Query user information from the database for currently authenticated user
  knex('Users')
  .where({ id: userId })
  .then((user) => {
    // Remember that knex will return an array of records, so we need to get a single record from it
    console.log('req.user:', user[0]);

    // The full user object will be attached to request object as `req.user`
    done(null, user[0]);
  })
  .catch((err) => {
    console.log('Error finding user', err);
  });
})

//========================================



//Initializing usersRoutes middleware
app.use('/users', usersRoutes);

//Initializing authRoutes middleware
app.use('/auth', authRoutes);

//Initializing accountRoute middleware
app.use('/accounts', accountRoute);

//Initializing goalsAndBudgetingRoute middleware
app.use('/goals', goalsRoute);

//Initializing goalsAndBudgetingRoute middleware
app.use('/budgets', budgetsRoute);

//Initializing homeDashboardRoute middleware
app.use('/homeDashboard', homeDashboardRoute);

//Initializing reportsAndAnalysisRoute middleware
app.use('/reportsAndAnalysis', reportsAndAnalysisRoute);

//Initializing transactionsRoute middleware
app.use('/transactions', transactionsRoute);

//Initializing loanRoute middleware
app.use('/loans', loanRoute);

//Initializing creditScoresRoutes middleware
app.use('/creditscores', creditScoresRoutes);

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}.`);
});