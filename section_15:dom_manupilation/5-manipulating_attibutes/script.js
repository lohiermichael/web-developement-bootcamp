// Manipulate image content

var img1 = document.getElementsByTagName("img")[0];console.log(img1.getAttribute("src"));
// Change the source of an image
img1.setAttribute("src", "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/yorki-linda-koelbel.jpg")

// Manipulate anchor tag

var a = document.querySelector("a");
a.setAttribute("href", "http://www.corgis.com")
console.log(a)
a.textContent = "Link to Corgis"
