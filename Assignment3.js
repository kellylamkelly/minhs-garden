// Include http, express, handlebars, path, and sessions
var express = require("express");
var http = require("http");
var path = require("path");
var exphbs = require("express-handlebars");
const res = require("express/lib/response");
const expressSession = require('express-session');

// Get model functions
var support = require("./model/model.js");

// Construct actual express object
var app = express();

// Set session properties
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "345hjbkSEfjkmdsnfjsdNf98",
    cookie: {maxAge: 600000} // 600 seconds = 10 mins
}))

// Set up handlebars
var handlebars = exphbs.create({ defaultLayout: 'main' });
app.engine('.handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('views'));

// Home page "/" - when initially requested, load plant list into session
app.get("/", function (request, response) {
    if (!request.session.plantSession) { // if no plant list in session
        request.session.plantSession = support.getPlants(); // load and store now
    }
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
    var requestedPlant = support.getPlantByID(request.id, request.session.plantSession);
    response.render("plantDetails", {plant: requestedPlant});
});

// Add plant to cart
app.get("/add", function(request, response, next) {
    var id = request.query.id; // get id from request
    var mycart = request.session.cart; // get cart from session
    // add plant to cart, getting modified cart as return
    mycart = support.addPlant(id, mycart, request.session.plantSession);
    // store modified cart in session
    request.session.cart = mycart;
    next();
});

// Display cart page
app.get("/cart", function(request, response) {
    response.render("cart", {cart: request.session.cart,
                             total: support.getTotal(request.session.cart)});
});

// Display cart page
app.get("/add", function(request, response) {
    response.render("cart", {cart: request.session.cart,
                             total: support.getTotal(request.session.cart),
                             addcourse: support.getPlantByID(request.query.id, 
                                                            request.session.plantSession)});
});

// Display cart page
app.get("/remove", function(request, response) {
    response.render("cart", {cart: request.session.cart,
                             total: support.getTotal(request.session.cart),
                             removeplant: support.getPlantByID(request.query.id, 
                                                            request.session.plantSession)});
});

// Display cart page
app.get("/change", function(request, response) {
    response.render("cart", {cart: request.session.cart,
                             total: support.getTotal(request.session.cart),
                             changeplant: support.getPlantByID(request.query.id, 
                                                            request.session.plantSession)});
});

// Remove selected plant
app.get("/remove", function(request, response, next) {
    var id = request.query.id; // get id from request
    var mycart = request.session.cart; // get cart from session
    // call support function to remove plant from cart
    cart = support.removePlant(id, mycart);
    // store modified cart back into session
    request.session.cart = mycart;
    next();
});

// Change quantity of selected plant
app.get("/change", function(request, response, next) {
    var id = request.query.id; // get id of plant to change
    var quantity = request.query.quantity; // get new value to change quantity
    var cart = request.session.cart; // get cart from session
    // call support function to change quantity for this plant in cart
    cart = support.changeQuantity(id, quantity, cart);
    // store modified cart back into session
    request.session.cart = cart;
    next();
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
