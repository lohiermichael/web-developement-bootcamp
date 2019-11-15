// Let's write four different ways to select the first paragraph

// Way 1: by id
console.log(document.getElementById("first"));

// Way 2: by tag and taking the first element
console.log(document.getElementsByTagName("p")[0]);

// Way 3: by query by id
console.log(document.querySelector("#first"));

// Way 4: by query by class (retrieve the first element only)
console.log(document.querySelector(".special"));


