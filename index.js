// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0
const port = 106719;
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

