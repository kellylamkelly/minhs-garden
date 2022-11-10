// Include http, express, handlebars, and path
var express = require("express");
var http = require("http");
var path = require("path");
var exphbs = require("express-handlebars");
const res = require("express/lib/response");

// Get model functions
var support = require("./model/model.js");

// Construct actual express object
var app = express();

// Set up handlebars
var handlebars = exphbs.create({ defaultLayout: 'main' });
app.engine('.handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('views'));

// Home page "/"
app.get("/", function (request, response) {
    response.render("home");
});

// Render the list of plant names and their IDs
app.get("/plants", function (request, response) {
    var plantList = support.getPlants();
    response.render("plants", {plants: plantList});
});

// Get the requested ID
app.get("/plantDetails", function (request, response, next) {
    request.id = request.query.id;
    next();
});

// Display info for requested id
app.get("/plantDetails", function (request, response, next) {
    var requestedPlant = support.getPlantByID(request.id);
    response.render("plantDetails", {plant: requestedPlant});
});

// If reach here, request not handled by any previous gets, so send error page
app.use(function (request, response) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<html><body><h2>Sorry -- file not found!</h2></body></html>');
});

// If reach here, an unhandled error occurred somewhere previously
app.use(function (err, request, response, next) {
    console.log(err);
    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.end('<html><body><h2>Server error!</h2></body></html>');
});

http.createServer(app).listen(3000);
