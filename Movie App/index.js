

const API_KEY = 'api_key=8a883d9581984c0de8ccdad9701a70a8';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL =  BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500'

getMovies(API_URL);

function getMovies (url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results);

    })
}

function showMovies(data) {

    data.forEach(movie =>{
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML= `
        <div class="movie_list">
          <div class="movie_container">
            <div class="image_div">
              <img src="${IMG_URL}" alt="" />
            </div>
            <div class="info_text">
              <h3 class="name">Jaws</h3>
              <span class="points">8.7</span>
            </div>
          </div>`
    })
}

