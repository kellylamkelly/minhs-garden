var mongoose = require("mongoose");

// Schema that corresponds to product fields
var plantSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    environment: String,
    heightEst: String,
    sunExp: String,
    image: String,
    quantity: Number,
    maxQuantity: Number,
    minQuantity: Number
});

// Callback used to force caller to wait for this function to finish (Assignment 4)
function getPlants(callback) {
    // Connect to database using URL
    const uri = "mongodb+srv://lam:plantPass@cluster0.b4u0nhm.mongodb.net/PlantsDatabase?retryWrites=true&w=majority";
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    // Connect model to collection online
    const Plants = mongoose.model('plants', plantSchema);

    // Query the colleciton for all documents using {} as the search criteria
    Plants.find({}, (err, plantList) => {
        if (err) {console.log(err);}
        else {
            console.log("Got plant list");
            // console.log(plantList);
        }
        // Return the resulting list of plants using the callback
        callback(plantList);
    });
}

module.exports = {getPlants};