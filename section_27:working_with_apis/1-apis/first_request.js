// Use of request library
// const request = require("request");

// request("http://www.googleadsfasdf.com", function(error, response, body) {
//     if (error){
//         console.log("SOMETHING WENT WRONG");
//         console.log("Here is the error");
//         console.log(error);
//     }
//     else{
//         // Things worked
//         if (response.statusCode == 200){
//             console.log(body);
//         }
//     }
// });

// Request an API
// request("https://jsonplaceholder.typicode.com/users/1", (
//   error,
//   response,
//   body
// ) => {
//   // Use of lotus library
//   // eval(require("locus"));
  
//   console.error("error:", error); // Print the error if one occurred
//   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//   // The body is returned as a string
//   console.log("The type of the body is a", typeof body);
//   // It is not a JavaScript object, we need to parse it
//   var parsedData = JSON.parse(body);
//   console.log("result:", parsedData); 
//   console.log(`${parsedData.name} lives in street ${parsedData['address']['street']}`);
// });

// We can also use request promise library
const rp = require('request-promise')

rp("https://jsonplaceholder.typicode.com/users/1")
    .then((htmlString) => {
        // console.log(htmlString);
        const parsedData = JSON.parse(htmlString);
        console.log(`${parsedData.name} lives in street ${parsedData['address']['street']}`);
    })
    .catch((err) => {
        console.log("Error:", err);
    });