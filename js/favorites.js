/** @format */

const homeBtn = document.querySelector(".home-btn");
const movieContainer = document.querySelector(".movieListSlider");
let movieCardElement;

homeBtn.addEventListener("click", () => {
  window.location.href = `../index.html`;
});

//array of the fav movie list
let listOfMovies = [];

let favMovieList = JSON.parse(localStorage.getItem("favMovieList"));
if (favMovieList.length == 0) {
  movieContainer.innerHTML = `Nothing to show here :( please add movies to watch !!!`;
} else {
  favMovieList.forEach((movieId) => {
    fetchMovie(movieId);
  });

  //fetch movie data using movie id
  async function fetchMovie(movieId) {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movieId}&apikey=fc1fef96`
    );
    const movie = await response.json();
    console.log(movie);
    if (movie.Response === "True") addMovieToDom(movie);
  }
  //adding to dom
  function addMovieToDom(movieData) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movieCard");
    movieDiv.dataset.id = movieData.imdbID;
    movieDiv.innerHTML = `
    <img src="${movieData.Poster}" alt="movie poster">
    <p class="movieName">${movieData.Title}</p>
    <a class="redirect-link" href="../pages/movieDetails.html?movieId=${movieData.imdbID}"/>`;

    movieContainer.appendChild(movieDiv);
  }
}
