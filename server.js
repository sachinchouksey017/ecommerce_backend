const express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const config = require('./config/config')
const app = express()
const route = require('./routes/router')

const bp = require("body-parser")
const port = 3000


app.get("/hello", (req, res) => {
    res.send(" world");
});
app.use(bodyParser.json())
app.use('', route)
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, data) => {
        if (err) {
            console.log('error in database connection', err);

        } else {
            console.log('Database connected successFully');
        }
    })

module.exports = { express }