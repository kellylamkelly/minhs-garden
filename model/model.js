// Search array function to get the object corresponding to ID
function findPlantByID(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

// Retrieve list of plants
function getPlants() {
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

    return plantList;
}

// Search for plant with given id in list
function getPlantByID(id) {
    var plantList = getPlants();
    for (let plant of plantList) {
        if (id === plant.id) {
            return plant;
        }
    }
    return null;
}

// Compute cost of plant in terms of plant type
function getPrice(id) {
    var price = 0;
    var plant = getPlantByID(id);
    console.log(plant);
    price = plant.price;
    return price;
}

// Make function available publicly
module.exports = {findPlantByID, 
                    getPlants, 
                    getPlantByID, 
                    getPrice}