var faker = require('faker');

// 4. Tests on how it works
// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact card containing many properties
// console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

// For local data
// var faker = require('faker/locale/de');
// faker.seed(123);
// var firstRandom = faker.random.number();
// // Setting the seed again resets the sequence.
// faker.seed(123);
// var secondRandom = faker.random.number();
// console.log(firstRandom === secondRandom);


// Make a header
console.log("==================")
console.log("WELCOME TO MY SHOP!")
console.log("==================")
// Loop over for 10 products
for (var i = 0; i < 10; i++){
    // Generate new product name 
    var productName = faker.commerce.productName();
    // Generate its fake price
    var productPrice = faker.commerce.price();
    console.log(productName + " - $" + productPrice);
}
