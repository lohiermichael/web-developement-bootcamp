// Build the list of movies

var movies = [
  {
    "watched": true,
    "title": "In Bruges",
    "nbStars": 5,
  },
  {
    "watched": false,
    "title": "Frozen",
    "nbStars": 4.5,
  },
  {
    "watched": true,
    "title": "Mad Max Fury Road",
    "nbStars": 5,
  },
  {
    "watched": false,
    "title": "Les Miserables",
    "nbStars": 3.5,
  },
]


function buildString(movie){
  var str = "You have"

  // Is it watched?
  if (movie.watched){
    str += "watched ";
  }
  else{
    str += "not watched ";
  }
  
  // tile of the movie
  str += "\"" + movie.title + "\""

  // Number of stars
  str += " - " + movie.nbStars + " stars"
  return str
}

// Print the movies one after another

movies.forEach(function(movie){
  console.log(buildString(movie));
})
