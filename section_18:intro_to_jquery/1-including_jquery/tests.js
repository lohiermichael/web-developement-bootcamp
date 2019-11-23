// The $ sign to select elements
console.log($);

// Select all h1
console.log($("h1"));

// Select all l1
console.log($("li"));

// Select body
console.log($("body"));

// Se;ect the anchor tag
console.log($("a"));
console.log($("li a"));
console.log($("ul li a"));

// Select an id
console.log($("#adorable"));

// Modify the CSS properties of elements
$("h1").css("color", "red");

// Change several properties at once
var styles = {
    color: "yellow",
    background: "pink",
    border: "2px solid purple"
}

$("#adorable").css(styles);

// Change several similar elements at once
// for example all lis to be blue
$("li").css("color", "blue")

// with jQuery, we use Camel case for css properties
$("li").css({
    fontSize: "10px",
    border: "3px dashed purple",
    background: "rgba(89, 45, 20, 0.5)"
})