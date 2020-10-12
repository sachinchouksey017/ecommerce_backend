const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const config = require('./config/config')
const app = express()
const route = require('./routes/router')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const bp = require("body-parser")
const port = 3000


app.get("/hello", (req, res) => {
    res.send(" world");
});
app.use(cors())
app.use(bodyParser.json())
app.use('', route)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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