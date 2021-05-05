#!/usr/bin/env node
var path = require('path')
var express = require('express');
var app = express();
var http = require('http')
var https = require('https');
const fs = require('fs');
var bodyParser = require('body-parser');

const api = require('../scripts/bet365/api'),
      db = require('../scripts/db');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

http.createServer(app).listen(7777);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
});