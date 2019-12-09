// 1. Install a package with npm install
// ex: npm install cat.me

// 2. Reference the package with the require method
var cat = require("cat-me");
var joke = require("knock-knock-jokes");

// 3. Use it
console.log(cat()) // => returns a random cat
console.log(joke()) // => returns a random joke