// use a console log to show the contents of the movies array from movieData.js
//console.log(movies);

// find movies from the 90s, 2000s, and 2010s
// make arrays to hold the movies from those decades
let movies90s = [];
let movies2000s = [];
let movies2010s = [];

// loop through the movies array (from movieData.js) to get the movies from the decades
// use the length property of arrays to tell how many times we need to loop
for( var i = 0; i < movies.length; i++)
{
    // get the current movie from the array 
    //console.log(movies[i]);
    let currentMovie = movies[i];

    // we can get the title, profit, and/or year key for each movie

    // if the movie is a 90's movie
    if(currentMovie.year >= 1990 && currentMovie.year < 2000)
        movies90s.push(currentMovie);
    else if(currentMovie.year >= 2000 && currentMovie.year < 2010)
        movies2000s.push(currentMovie);
    else if(currentMovie.year >= 2010)
        movies2010s.push(currentMovie);
}

// display the number of movies from each decade
console.log(`# of 90's movies: ${movies90s.length}`);
console.log(`# of 2000's movies: ${movies2000s.length}`);
console.log(`# of 2010's movies: ${movies2010s.length}`);