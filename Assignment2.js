// Include http, express, handlebars, and path
var express = require("express");
var http = require("http");
var path = require("path");
var exphbs = require("express-handlebars");

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

// Product Detail Page. Step 1: Render the list of plant names and their IDs
app.get("/plants", function (request, response) {
    const plantList = [
        {
            id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "views/images/aloeVera.png"
        },
        {
            id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
            price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "views/images/spiderPlant.png"
        },
        {
            id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
            price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "views/images/bambooPalm.png"
        }
    ];
    response.render("plants", {plants: plantList});
});

// Product Detail Page. Step 2: Get the requested ID
app.get("/plants", function (request, response, next) {
    request.id = request.query.id;
    next();
});

// // Product Detail Page. Step 3: Validate the ID
// app.use("/plants", function (request, response, next) {
//     var errors = new Object(); // New (empty) object
//     var valid = true; // Initially no errors

//     if (request.id.trim() === "") { // Must not be empty
//         errors.MissingID = true; // Add to error object
//         valid = false; // Error found
//     }

//     if (valid) {
//         next(); // No errors, so continue normal route
//     }
//     else {
//         request.errorList = errors; // At least one error, so add object to request
//         next(new Error("details")); // and follow error route
//     }
// });

// Product Detail Page. Step 4: Display info for requested id
app.get("/plants", function (request, response, next) {
    for (let plant of plantList) {
        if (request.id == plant.id) {
            var requestedPlant = {id: plant.id,
                                    name: plant.name,
                                    description: plant.description,
                                    price: plant.price,
                                    environment: plant.environment,
                                    heightEst: plant.heightEst,
                                    sunExp: plant.sunExp,
                                    image: plant.image};

            response.render("plantDetails", {plant: requestedPlant});
        }
    }
});

// If "details" error, redisplay form
app.use("/plants", function (err, request, response, next) {
    if (err.message.includes("details")) {
        const plantList = [
            {
                id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
                price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "views/images/aloeVera.png"
            },
            {
                id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
                price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "views/images/spiderPlant.png"
            },
            {
                id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
                price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "views/images/bambooPalm.png"
            }
        ];
        response.render("plants", {plants: plantList, 
                                    errors: request.errorList}); // Pass errors to form
    }
    else {
        next(err); // if not an "details" error, continue error routing
    }
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
