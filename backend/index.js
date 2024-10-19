const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;

app.use(express.json());

const defaultRouteHandler = (req, res) => {
    res.send("At default route");
}
const signRouteHandler = (req, res) => {
    const pass = "1234567890";
    const payload = { user: "John Doe" };
    const token = jwt.sign(payload, pass);
    res.send(token.toString());
}
const loginRouteHandler = (req, res) =>{
    const token = req.headers.token;
    const pass = "1234567890";
    const verify = jwt.verify(token,pass);
    if (verify) {
        res.send("login successfully");
    }else{
        res.send("error at login route");
    }
}
// all routes
app.get('/', defaultRouteHandler);
app.post('/sign', signRouteHandler);
app.get('/login', loginRouteHandler);


app.use((err, req, res, next) => {
    console.error(err);
    console.log("error catch at global catcher");

})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})