let id_same =0;
$(document).ready(() => {
  $('#searchForm').keyup((e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
  if($('#searchForm').keyup()){
   getMovies2();
   topRated();
   popular();
   coming();
  }
  
  
});

function getMovies(searchText){
  axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
           <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}');" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#movies_search').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}



function getMovies2(){
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=400225a1886f38d9cf3c934d6a756c4d&page=1&sort_by=popularity.desc&primary_release_year=2019&primary_release_year=2018`) 
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}');" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
/* popular */
function popular(){
  axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}');" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#movies_popular').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
/* Top rated*/
function topRated(){
  axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#movies_rated').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

/* up comong*/
function coming(){
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=400225a1886f38d9cf3c934d6a756c4d&page=1&&primary_release_year=2019&primary_release_year=2021&primary_release_year=2020`) 
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#movies_coming').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}




function getMovie(){
  let movieId = sessionStorage.getItem('movieId');  
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Ccredits%2Creviews&api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let result = response.data.videos;
      let geners = response.data.genres[0].name;
      let geners_id = response.data.genres[0].id;
      let country = response.data.production_countries[0].name;
      let company = response.data.production_companies[0].name;
       sessionStorage.setItem('type',geners);
       sessionStorage.setItem('id_name',geners_id);

       $("body").css( "background", `url(https://image.tmdb.org/t/p/w185${movie.poster_path})`);
      let output =`
        <div class="row_bg">
          <div class="title">
            <h1>${movie.title}</h1>
            <div class="rating">
		        <img src="img/star1.png" alt="" width="17" height="17" border="0">
		        <img src="img/star1.png" alt="" width="17" height="17" border="0">
		        <img src="img/star2.png" alt="" width="17" height="17" border="0">
		        <img src="img/star0.png" alt="" width="17" height="17" border="0">
		        <img src="img/star0.png" alt="" width="17" height="17" border="0">
		    </div>
           </div> 
          <div class="movie_info">
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" class="thumbnail">
            <div>
            <ul class="list-group">
              <li class="list-group-item"><strong>IMDB Rating: </strong> <span>${movie.vote_average}<span></li>
              <li class="list-group-item"><strong>IMDB Votes:</strong> ${movie.popularity}</li>
              <li class="list-group-item"><strong>Country:</strong> ${country}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
              <li class="list-group-item"><strong>Company Production:</strong> ${company}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${geners}</li>
              <li class="list-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
              <li class="list-group-item inline video_show"><a>Play Trailer </a></li>
              <li class="list-group-item inline img_show"><a> - Poster</a></li>
            </ul>
            <div class="details">
            <h3>Cast</h3>
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn">View IMDB</a>
            <a href="search.html" class="btn">Go Back To Search</a>
           </div>
          </div>
          
        </div>
        </div>
          </div>
           <div class="intro intro_img hide">
               <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" class="thumbnail">
           </div>
          <div class="intro intro_video hide">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>  
      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

     let gentype = sessionStorage.getItem('id_name');   
     let genname =sessionStorage.getItem('type');
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=400225a1886f38d9cf3c934d6a756c4d&page=1&with_genres=${gentype}&sort_by=${genname}&sort_by=popularity.desc`)
    .then((response) => {
      console.log(response);
        let movies = response.data.results;
      let output_same = '';
      $.each(movies, (index, movie) => {
       output_same +=`
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
              </a>
            
            </div>
          </div>
         `;
    });

      $('#movies_same').html(output_same);
    })
    .catch((err) => {
      console.log(err);
    });
}