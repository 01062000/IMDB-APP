const seachElement = document.querySelector("#search");
const seachListDiv = document.querySelector(".searchList");
const favBtn = document.querySelector(".fav-btn");

favBtn.addEventListener('click', () => {
    window.location.href = `../pages/favorites.html`;
})

//fetch movies using seach token
async function fetchMovies(searchedToken){
    const response = await fetch(`https://omdbapi.com/?s=${searchedToken}&page=1&apikey=fc1fef96`);
    const moviesData = await response.json();
    if(moviesData.Response === 'True'){
        displayMovieList(moviesData.Search);
    }
}
//display to dom
function displayMovieList(movies){
    console.log(movies);
    seachListDiv.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            continue;

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        seachListDiv.appendChild(movieListItem);
        movieListItem.addEventListener('click', () => {
            window.location.href = `../pages/movieDetails.html?movieId=${movies[idx].imdbID}`;
        })
    }
}
//geeting the token from seach input
function getSeachedMovieString(){
    let searchedToken = (seachElement.value).trim();
    if(searchedToken.length > 0){
        seachListDiv.classList.remove('hide-search-list');
        fetchMovies(searchedToken);
    }else{
        seachListDiv.classList.add('hide-search-list');
    }
}

seachElement.addEventListener('keyup', getSeachedMovieString);
seachElement.addEventListener('click', getSeachedMovieString);

window.addEventListener('click', (event) => {
    if(event.target.className != "search"){
        seachListDiv.classList.add('hide-search-list');
    }
});