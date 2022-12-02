// Retrieve list of plants (Assignment 3)
// function getPlants() {
//     const plantList = [
//         {
//             id: "PI100001", name: "Aloe Vera", description: "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant's central stem.",
//             price: 5.00, environment: "Indoor", heightEst: "6 to 9 inches", sunExp: "Full, partial", image: "aloeVera.png", quantity: 1, maxQuantity: 5, minQuantity: 1
//         },
//         {
//             id: "PI100002", name: "Spider Plant", description: "The spider plant is a plant in the Chlorophytum genus. It is considered one of the most adaptable of houseplants and the easiest to grow. Spider plants can produce small white flowers.",
//             price: 10.00, environment: "Indoor", heightEst: "8 to 11 inches", sunExp: "Partial, shade", image: "spiderPlant.png", quantity: 1, maxQuantity: 5, minQuantity: 1
//         },
//         {
//             id: "PI100003", name: "Bamboo Palm", description: "A bamboo palm, or Chamaedorea, is a type of palm in the Chamaedorea genus. It's also a rare tropical delight in that, unlike many of its warm-weather cousins, it can actually thrive in lower light.",
//             price: 5.00, environment: "Indoor", heightEst: "6 to 11 inches", sunExp: "Partial, shade", image: "bambooPalm.png", quantity: 1, maxQuantity: 5, minQuantity: 1
//         }
//     ];

//     return plantList;
// }

// Search for plant with given id in list
function getPlantByID(id, plantList) {
    for (let plant of plantList) {
        if (id === plant.id) {
            return plant;
        }
    }
    return null;
}

// Add plant with given id to cart
// Parameters: id (from request), cart (stored in session), plants (stored in session)
function addPlant(id, cart, plantList) {
    // search list of plants for one with the given id
    var plant = getPlantByID(id, plantList);
    
    // check whether cart exists yet and create if not
    if (cart == null) {
        cart = [];
    }

    cart.push(plant); // add plant to end of cart array
    return cart;
}

// Get the index of the plant with the given id in the cart,
// or -1 if no plant with that id in cart
function getIndex(id, cart) {
    count = 0;
    for (let plant of cart) { // loop through cart array
        if (id === plant.id) { // compare ids
            return count; // if match, plant with id at this index
        }
        count++;
    }
    return -1; // give id not found in cart
}

// Change quantity of plant with given id to n
function changeQuantity(id, n, cart) {
    // get index of plant with given id in cart
    var where = getIndex(id, cart);
    // validate this plant is actually in cart
    if (where != -1) {
        // change quantity property to new value
        cart[where].quantity = n;
    }
    return cart;
}

// Remove plant with given id from cart
function removePlant(id, cart) {
    // get index of plant with given id in cart
    var where = getIndex(id, cart);
    // validate this plant is actually in cart
    if (where != -1) {
        // splice list before and list after plant together
        cart.splice(where, 1);
    }
    return cart;
}

// Compute cost of plant in terms of plant type
function getTotal(cart) {
    var total = 0; // running total of price
    for (let plant of cart) {
        total += (parseInt(plant.quantity) * plant.price);
    }
    return total;
}

// Make sure plant not in cart before adding
function validateAdd(id, cart) {
    var errors = {}; // new empty object
    if (cart) { // only search if cart exists
        var where = getIndex(id, cart);
        if (where != -1) {
            // Add error to list
            errors.DuplicatePlant = true;
        }
    }
    return errors;
}

// Make function available publicly
module.exports = {getPlantByID,
                    getIndex,
                    changeQuantity,
                    addPlant,
                    removePlant,
                    getTotal,
                    validateAdd}