// Include http, express, and path
var http = require("http");
var express = require("express");
var path = require("path");

// constructs actual express object
var app = express();

// Path for product files
var productPath = path.resolve(__dirname, 'Files');
app.use(express.static(productPath));

// Home page "/"
app.get("/", function(request, response, next) {
    response.sendFile("select.html", {root: productPath}, function(err) {
        if (err) {
            next(err);
        }
    })
});

// Single method for product pages
app.get("/select/:productID", function(request, response, next) {
    var langfile = request.params.productID + ".html";
    response.sendFile(langfile, {root: productPath}, function(err) {
        if (err) {
            next(new Error("ProductID file not found"));
        }
    });
});

// First error handling routine logs error
app.use("/select", function(err, request, response, next) {
    console.log(err);
    next(err); // Create new error specific to problem
});

// Next error handling routine sends back error message (and stops)
app.use("/select", function(err, request, response, next) {
    if (err.message.includes("ProductID file not found")) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<html><body><h2>Sorry, that product cannot be found!</h2></body></html>');
    }
    else {
        next(err); // if this was not the error, route to the next handler
    }
});

// If reach here, request not handled by any previous gets, so send error page
app.use(function(request, response) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('<html><body><h2>Sorry -- file not found!</h2></body></html>');
});

// If reach here, an unhandled error occurred somewhere previously
app.use(function(err, request, response, next) {
    console.log(err);
    response.writeHead(500, {'Content-Type': 'text/html'});
    response.end('<html><body><h2>Server error!</h2></body></html>');
});

http.createServer(app).listen(3000);
