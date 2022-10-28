// Include http, express, handlebars, and path
var express = require("express");
var http = require("http");
var path = require("path");
var exphbs = require("express-handlebars");
const res = require("express/lib/response");

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
    const plantList = [
        {
            id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "aloeVera.png"
        },
        {
            id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
            price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "spiderPlant.png"
        },
        {
            id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "bambooPalm.png"
        }
    ];
    response.render("plants", {plants: plantList});
});

// Get the requested ID
app.get("/plantDetails", function (request, response, next) {
    request.id = request.query.id;
    next();
});

// Validate the ID
app.use("/plantDetails", function (request, response, next) {
    var errors = new Object(); // New (empty) object
    var valid = true; // Initially no errors
    const plantList = [
        {
            id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "aloeVera.png"
        },
        {
            id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
            price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "spiderPlant.png"
        },
        {
            id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "bambooPalm.png"
        }
    ];

    if (findPlantByID(plantList, 'id', request.id) === null) { // Must be in product list
        errors.idDoesNotExist = true; // Add to error object
        valid = false; // Error found
    }

    if (valid) {
        next(); // No errors, so continue normal route
    }
    else {
        request.errorList = errors; // At least one error, so add object to request
        next(new Error("details")); // and follow error route
    }
});

// If "details" error, redisplay form
app.use("/plantDetails", function (err, request, response, next) {
    if (err.message.includes("details")) {
        const plantList = [
            {
                id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
                price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "aloeVera.png"
            },
            {
                id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
                price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "spiderPlant.png"
            },
            {
                id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
                price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "bambooPalm.png"
            }
        ];
        response.render("plants", {plants: plantList, 
                                    errors: request.errorList}); // Pass errors to form
    }
    else {
        next(err); // if not an "details" error, continue error routing
    }
});

// Search array function to get the object corresponding to ID
function findPlantByID(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

// Display info for requested id
app.get("/plantDetails", function (request, response, next) {
    const plantList = [
        {
            id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "aloeVera.png"
        },
        {
            id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
            price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "spiderPlant.png"
        },
        {
            id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "bambooPalm.png"
        }
    ];

    var requestedPlant = findPlantByID(plantList, 'id', request.id);

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
