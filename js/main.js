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
   tv_show();
  }

  
});

function getMovies(searchText){
  axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchText}&api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
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
               <span>${movie.name}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=400225a1886f38d9cf3c934d6a756c4d`) 
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
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
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
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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
  axios.get(`https://api.themoviedb.org/3/movie/upcoming?page=1&api_key=400225a1886f38d9cf3c934d6a756c4d`) 
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
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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
/* tv show*/
function tv_show(){
  axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=400225a1886f38d9cf3c934d6a756c4d`) 
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
               <span>${movie.name}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#tv_show').html(output);
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
      let geners = response.data.genres;
      let geners_id = response.data.id;
      let credit = response.data.credits.cast;
      let geners_names = geners.map((x,index) => geners[index].name);
      let cast_names = credit.map((x,index) => credit[index].name);
      let cast_ids = credit.map((x,index) => credit[index].id);
      let elecast="";
      let country = response.data.production_countries.map((x,index) => response.data.production_countries[index].name);
      let company = response.data.production_companies.map((x,index) => response.data.production_companies[index].name);
       $.each(cast_names, (index, name) => {
              elecast += `<li class="list-group-item cast"><a onclick="castSelected('${cast_ids[index]}')">${name}</a></li>`;
        });
      let style = {
           "background":`url(https://image.tmdb.org/t/p/original${movie.poster_path})`,     
          "background-repeat": "no-repeat",
    "background-position":"center center",
    "background-size": "cover"
      };
       sessionStorage.setItem('id_name',geners_id);
  
       $("body").css( style);
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
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="thumbnail">
            <div>
            <ul class="list-group">
              <li class="list-group-item"><strong>IMDB Rating: </strong> <span>${movie.vote_average}</span></li>
              <li class="list-group-item"><strong>IMDB Votes:</strong> ${movie.popularity}</li>
              <li class="list-group-item"><strong>Country:</strong> ${country}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
              <li class="list-group-item"><strong>Company Production:</strong> ${company}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${geners_names}</li>
              <li class="list-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
              <li class="list-group-item inline"><a class="show_video"  onclick="myFunction2()">Play Trailer</a></li>
              <li class="list-group-item inline"><a class="show_poster"  onclick="myFunction()"> - Poster</a></li>
            </ul>
            <div class="details">
            <h3>Cast</h3>
            <ul class="list-group">
            ${elecast}
               
            </ul>
            
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn">View IMDB</a>
            <a href="search.html" class="btn">Go Back To Search</a>
           </div>
          </div>
          
        </div>
        </div>
          </div>
           <div class="intro   hide_poster" id="intro_img">
               <a class="close" onclick="myFunction()"></a>
               <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" class="thumbnail">
           </div>
          <div class="intro  hide_poster" id="intro_video">
             <a class="close" onclick="myFunction2()"></a> 
             <iframe  class="youtube-video" style="height:70%;width:80%;" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>  
       
      `;
      output+=`<div class="sharethis-inline-share-buttons"></div>`;
      output+= `<div class="info">
         <h2>Recomendations Movies to ${movie.title}</h2>
       </div>`
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

     let movie_id =sessionStorage.getItem('id_name');
     

  axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=400225a1886f38d9cf3c934d6a756c4d`)
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
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
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

function myFunction() {
  let element = document.getElementById("intro_img");
  element.classList.toggle("hide_poster");
}

function myFunction2() {
  var element = document.getElementById("intro_video");
  element.classList.toggle("hide_poster");
}

/* get cast movies */
function castSelected(id){
  sessionStorage.setItem('castId', id);
  window.location = 'cast.html';
  return false;
}
function getCast(){
  let castid = sessionStorage.getItem('castId');  
  axios.get(`https://api.themoviedb.org/3/person/${castid}?api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
      let movie = response.data;
     
      let style = {
           "background":`url(https://image.tmdb.org/t/p/original${movie.profile_path})`,     
          "background-repeat": "no-repeat",
    "background-position":"center center",
    "background-size": "cover"
      };
  
       $("body").css( style);
      let output =`
        <div class="row_bg">
          <div class="title">
            <h1>${movie.name}</h1>
            <div class="rating">
            <img src="img/star1.png" alt="" width="17" height="17" border="0">
            <img src="img/star1.png" alt="" width="17" height="17" border="0">
            <img src="img/star2.png" alt="" width="17" height="17" border="0">
            <img src="img/star0.png" alt="" width="17" height="17" border="0">
            <img src="img/star0.png" alt="" width="17" height="17" border="0">
        </div>
           </div> 
          <div class="movie_info">
            <img src="https://image.tmdb.org/t/p/original${movie.profile_path}" class="thumbnail">
            <div>
            <ul class="list-group">
              <li class="list-group-item"><strong>Birthday: </strong> <span>${movie.birthday}</span></li>
              <li class="list-group-item"><strong>Known For Department:</strong> ${movie.known_for_department}</li>
              <li class="list-group-item"><strong>Country:</strong> ${movie.place_of_birth}</li>
              <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
              <li class="list-group-item inline"><a class="show_poster"  onclick="myFunction()"> - Poster</a></li>
            </ul>
            <div class="details">
            <h3>actor</h3>
            <h3>${movie.name}</h3>
            <p>${movie.biography}</p>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn">View IMDB</a>
            <a href="search.html" class="btn">Go Back To Search</a>
           </div>
          </div>
          
        </div>
        </div>
          </div>
           <div class="intro   hide_poster" id="intro_img">
               <a class="close" onclick="myFunction()"></a>
               <img src="https://image.tmdb.org/t/p/w300/${movie.profile_path}" class="thumbnail">
           </div>  
      `;
      output+= `<div class="info">
         <h2>Recomendations Movies to ${movie.name}</h2>
       </div>`
      $('#cast').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

  let person =sessionStorage.getItem('castId');
  axios.get(`https://api.themoviedb.org/3/person/${person}/movie_credits?api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
        let movies = response.data.cast;
      let output_same = '';
      $.each(movies, (index, movie) => {
       output_same +=`
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.title}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
              </a>
            
            </div>
          </div>
         `;
    });

      $('#cast_same').html(output_same);
    })
    .catch((err) => {
      console.log(err);
    });
}