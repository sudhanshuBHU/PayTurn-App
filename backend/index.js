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
const contactus = require('./src/routes/contactus');

const port = process.env.PORT || 8000;
const databaseUrl = process.env.DATABASE_URL;
// const port = 8000;

// middlewares
app.use(express.json());
app.use(bodyParser.json());
// const corsOptions = {
//     origin:"*",
//     credential:true,
//     methods:['GET','POST','PUT','DELETE'],
// }
// app.options('*', cors(corsOptions));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// signup and login routes
app.use('/auth', authRouter);

// db add transaction routes
app.use('/addTransaction', addTransactionRouter);

// contact us ->feedback
app.use('/contactUs', contactus);
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