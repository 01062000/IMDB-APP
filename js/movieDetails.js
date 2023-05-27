const movieContainer = document.querySelector(".movieContainer");
const homeBtn = document.querySelector(".home-btn");
const favBtn = document.querySelector(".fav-btn");
const delBtn = document.querySelector(".del-btn");
const urlParams = new URLSearchParams(location.search);
let idOfTheSearchedMovie; 
//getting the movie id from url parameter
for (const [key, value] of urlParams) {
    idOfTheSearchedMovie = value;
    console.log(`${key}:${value}`);
}

homeBtn.addEventListener('click', () => {
    window.location.href = `../index.html`;
})

//if the list is already present in the local storage then get thet otherwise set to empty list.
let favMovieList = JSON.parse(localStorage.getItem('favMovieList'));

if(favMovieList == null){
    favMovieList = [];
}

favMovieList.forEach(favMovieId => {
    if(favMovieId === idOfTheSearchedMovie){
        favBtn.style.display = `none`;
        delBtn.style.display = `block`;
    }
});

favBtn.addEventListener('click', () => {    
    //let favMovieList = [];
    window.location.href = `../pages/favorites.html`;
    favMovieList = [...favMovieList, idOfTheSearchedMovie];
    localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
})

//function to remove the movie id from
function removeMovieIdFromList(favMovieList, movieId){
    var index = favMovieList.indexOf(movieId);
    return [
        ...favMovieList.slice(0, index),
        ...favMovieList.slice(index + 1)
    ];
}
//remove the movie from fav list
delBtn.addEventListener('click', () => {
    favMovieList = removeMovieIdFromList(favMovieList, idOfTheSearchedMovie);
    localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
    window.location.href = `../pages/favorites.html`;
    console.log("current favorite movies: "+favMovieList);
})

fetchMovieData(idOfTheSearchedMovie);

//fetch movie data from url movie id
async function fetchMovieData(idOfTheSearchedMovie){
    console.log(idOfTheSearchedMovie);
    const response = await fetch(`https://www.omdbapi.com/?i=${idOfTheSearchedMovie}&apikey=fc1fef96`);
    const movieData = await response.json();
    addMovieDetailsToDom(movieData);
}
//adding to dom
function addMovieDetailsToDom(movieData){
    movieContainer.innerHTML = `<div class="movie_card" id="card">
    <div class="info_section">
      <div class="movie_header">
        <h1>${movieData.Title}</h1>
        <h2>${movieData.Actors}</h2>
        <h4>${movieData.Released}, ${movieData.Director}</h4>
        <span class="minutes">${movieData.Runtime}</span>
        <p class="type">${movieData.Genre}</p>
      </div>
      <div class="movie_desc">
        <p class="text">
        ${movieData.Plot}
        </p>
        <p class="rated">Rating: ${movieData.imdbRating}</p>
      </div>
    </div>
    <div class="blur_back card_back">
        <img src = "${movieData.Poster}" alt = "movie poster" class="movie-poster">
    </div>
  </div>`;
}
