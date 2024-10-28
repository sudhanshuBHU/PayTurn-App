const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
// DB connection
require('./src/models/dbConnect');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/signupAndLoginAuth');
const addTransactionRouter = require('./src/routes/addTransaction');

const port = process.env.PORT || 8000;
const databaseUrl = process.env.DATABASE_URL;
// const port = 8000;

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// signup and login routes
app.use('/auth',authRouter);

// db add transaction routes
app.use('/addTransaction', addTransactionRouter);

// default route handler
const defaultRouteHandler = (req, res) => {
    res.send("At default route");
}
app.get('/', defaultRouteHandler);


// master error handler
app.use((err, req, res, next) => {
    console.error(err);
    console.log("error catch at global catcher");

})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});