// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0
const port = 1067;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

let db_M = require('./database');
global.db_pool = db_M.pool;

global.htmlspecialchars = require('htmlspecialchars');
// const { addSlashes, stripSlashes } = require('slashes');


const Employees_R = require('./Routers/Employees_R');
app.use('/E/',Employees_R);

const Shifts_R = require('./Routers/Shifts_R');
app.use('/SH/',Shifts_R);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
