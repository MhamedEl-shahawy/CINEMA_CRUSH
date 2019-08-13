let episode_select = "";
let firstChoice = "";
 let  secondChoice="";
 let getUrl = "";
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
   trend();
  }

  
});

function getMovies(searchText){
  axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchText}&api_key=400225a1886f38d9cf3c934d6a756c4d&fbclid=IwAR1lZ_KgIDSQB2fMiSK--vCOv_3N1gIl4oLryfQaGjDyXOyr-4dKp6U5mkM`) 
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
           <div class="col-grid">
            <div class="well_box">
              <a onclick="callAll('${movie.id}','${movie.media_type}')" href="#">
               <div>
               <span>${movie.title || movie.name}</span>
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
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="tvSelected('${movie.id}')" href="#">
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
/* get trend*/
function trend(){
  axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=400225a1886f38d9cf3c934d6a756c4d`) 
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-grid">
            <div class="well_box">
              <a onclick="callAll('${movie.id}','${movie.media_type}')" href="#">
               <div>
               <span>${movie.original_title || movie.original_name}</span>
              </div>
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
              </a>
            
            </div>
          </div>
        `;
      });

      $('#trend').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = `movie.html`;
  return false;
}

 function tvSelected(id){
  sessionStorage.setItem('tvId', id);
  window.location = 'tvshow.html';
  return false;
}
/* get tv show */
function getTv(){
  let tvid = sessionStorage.getItem('tvId');  
  axios.get(`https://api.themoviedb.org/3/tv/${tvid}?append_to_response=external_ids&api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      sessionStorage.setItem("imd_ID",response.data.external_ids.imdb_id)     
     }).catch((err) => {
     console.log(err);
    });
   

  axios.get(`https://api.themoviedb.org/3/tv/${tvid}?append_to_response=videos%2Ccredits%2Creviews&api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let result = movie.videos.results[0].key;
      let geners = movie.genres;
      let geners_id = movie.id;
      let credit = movie.credits.cast;
      let geners_names = geners.map((x,index) => geners[index].name);
      let cast_names = credit.map((x,index) => credit[index].name);
      let seasons_number = movie.seasons.map((x,index) => movie.seasons[index].name);
      let episode_count = movie.seasons;
       let season = "";
      let cast_ids = credit.map((x,index) => credit[index].id);
      let elecast="";
      let imdbid = sessionStorage.getItem("imd_ID");
      sessionStorage.setItem("me",episode_count);
      let company = movie.production_companies.map((x,index) => movie.production_companies[index].name);
       $.each(cast_names.slice(0,11), (index, name) => {
              elecast += `<li class="list-group-item cast"><a onclick="castSelected('${cast_ids[index]}')">${name}</a></li>`;
        });
         $.each(seasons_number, (index, name) => {
              season += `<option value="${index}">${seasons_number[index]}</option>`;
        });            



     let style = {
           "background":`url(https://image.tmdb.org/t/p/original${movie.poster_path})`,     
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
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="thumbnail">
            <div>
            <ul class="list-group">
              <li class="list-group-item"><strong>IMDB Rating: </strong> <span>${movie.vote_average}</span></li>
              <li class="list-group-item"><strong>IMDB Votes:</strong> ${movie.popularity}</li>
              <li class="list-group-item"><strong>Country:</strong> ${movie.origin_country[0]}</li>
                      <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
              <li class="list-group-item"><strong>Company Production:</strong> ${company}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${geners_names}</li>
              <li class="list-group-item"><strong>Release Date:</strong> ${movie.last_air_date}</li>
              <li class="list-group-item"><strong>Select Season To Watch :</strong>
              <select id="first-choice" onchange="change('${episode_count}','${imdbid}')">
               ${season}
            </select> 
            <select id="second-choice" onchange="change_espiosd()">
                  ${episode_select}
             </select>
              </li>
              <li class="list-group-item inline"><a class="show_video"  onclick="myFunction2()">Play Trailer</a></li>
              <li class="list-group-item inline"><a class="show_poster"  onclick="myFunction()">  Poster</a></li>
              <li class="list-group-item inline inline_watch"><a class="show_video"   onclick="myFunction3_tv('${imdbid}')"> Watch</a></li>
            </ul>
            <div class="details">
            <h3>Cast</h3>
            <ul class="list-group">
            ${elecast}
               
            </ul>
            
            <h3>${movie.name}</h3>
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
             <iframe  class="youtube-video" style="height:70%;width:80%;" src="https://www.youtube.com/embed/${result}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> 
          <div class="intro  hide_poster" id="intro_movie">
             <a class="close" onclick="myFunction3()"></a> 
             <iframe  class="youtube-video"  id="iframeSeacon" style="height:70%;width:80%;" src="${getUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>  
        
       
      `;
        
      output+= `<div class="info">
         <h2 class="inline_watch">Recomendations Series to <span>${movie.name}</span></h2>
       </div>`;
       

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

  
  axios.get(`https://api.themoviedb.org/3/tv/${tvid}/recommendations?api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
       console.log(response);
        let movies = response.data.results;
      let output_same = '';
      $.each(movies, (index, movie) => {
       output_same +=`
          <div class="col-grid">
            <div class="well_box">
              <a onclick="tvSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.name  || movie.original_name}</span>
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




 


function getMovie(data,i){
  let movieId = sessionStorage.getItem('movieId'); 
  
/*  axios.get(`https://videospider.in/getticket.php?key=FQrJeZSH1wgYmjhl&secret_key=g687ywtcgl3depxd89ftkyqn3rn2xg&video_id=tt2316204&ip='.$_SERVER["REMOTE_ADDR"]`)*/
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Ccredits%2Creviews&api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let result = movie.videos.results[0].key;
      let geners = movie.genres;
      let geners_id = movie.id;
      let imdbid = movie.imdb_id;
      let credit = movie.credits.cast;
      let geners_names = geners.map((x,index) => geners[index].name);
      let cast_names = credit.map((x,index) => credit[index].name);
      let cast_ids = credit.map((x,index) => credit[index].id);
      let elecast="";
      let country = movie.production_countries.map((x,index) => movie.production_countries[index].name);
      let company = movie.production_companies.map((x,index) => movie.production_companies[index].name);
       $.each(cast_names.slice(0,11), (index, name) => {
              elecast += `<li class="list-group-item cast"><a onclick="castSelected('${cast_ids[index]}')">${name}</a></li>`;
        });
  

    /*let get_tickets_movies =
*/
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
              <li class="list-group-item inline"><a class="show_poster"  onclick="myFunction()">  Poster</a></li>
              <li class="list-group-item inline inline_watch"><a class="show_video"   onclick="myFunction3()"> Watch</a></li>
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
             <iframe  class="youtube-video" style="height:70%;width:80%;" src="https://www.youtube.com/embed/${result}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> 
          <div class="intro  hide_poster" id="intro_movie">
             <a class="close" onclick="myFunction3()"></a> 

             <iframe  class="youtube-video" style="height:70%;width:80%;" src="https://vidsrc.me/embed/${imdbid}/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>  
        
       
      `;
      
      output+= `<div class="info">
         <h2 class="inline_watch">Recomendations Movies to <span>${movie.title}</span></h2>
       </div>`
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

  
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
        let movies = response.data.results;
      let output_same = '';
      $.each(movies, (index, movie) => {
       output_same +=`
          <div class="col-grid">
            <div class="well_box">
              <a onclick="movieSelected('${movie.id}')" href="#">
               <div>
               <span>${movie.title  || movie.original_name}</span>
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
              <li class="list-group-item inline"><a class="show_poster"  onclick="myFunction()"> Poster</a></li>
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
         <h2 class="inline_watch">Recomendations Artworks to <span>${movie.name}</span></h2>
       </div>`
      $('#cast').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
      

  let person =sessionStorage.getItem('castId');
  axios.get(`https://api.themoviedb.org/3/person/${person}/combined_credits?api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response) => {
      console.log(response);
        let movies = response.data.cast;
        

        
      let output_same = '';
      $.each(movies, (index, movie) => {
       output_same +=`
          <div class="col-grid">
            <div class="well_box">
              <a onclick="callAll('${movie.id}','${movie.media_type}')" href="#">
               <div>
               <span>${movie.title  || movie.original_name}</span>
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
function myFunction() {
  let element = document.getElementById("intro_img");
  element.classList.toggle("hide_poster");
}

function myFunction2() {
  var element = document.getElementById("intro_video");
  element.classList.toggle("hide_poster");
}
function myFunction3() {
  var element = document.getElementById("intro_movie");
  element.classList.toggle("hide_poster");
}
function myFunction3_tv() {
        let imdbid = sessionStorage.getItem("imd_ID");
  var element = document.getElementById("intro_movie");
  element.classList.toggle("hide_poster");
  function reload() {
  $( "#iframeSeacon" ).load( `https://vidsrc.me/embed/${imdbid}/${firstChoice}-${secondChoice}/`, function() {
    $( "#iframeSeacon" ).attr("src",`https://vidsrc.me/embed/${imdbid}/${firstChoice}-${secondChoice}/`);
    });
  }
  reload()
}
function callAll(id,type){

  if(type == "movie") return movieSelected(id);
  else return tvSelected(id);
    
}
function change(num,imdbid){
    let tvid = sessionStorage.getItem('tvId');  
    axios.get(`https://api.themoviedb.org/3/tv/${tvid}?append_to_response=videos%2Ccredits%2Creviews&api_key=400225a1886f38d9cf3c934d6a756c4d`)
    .then((response)=>{
       $("#second-choice").empty();
    for(let i =1; i <= response.data.seasons[$("#first-choice").val()].episode_count;i++){
          $("#second-choice").append(`<option value="${i}">${i}</option>`)
       }
    }).catch((err) => {
      console.log(err);
    });
   
      }

      function change_espiosd(){
         firstChoice = $("#first-choice").val();
    secondChoice = $("#second-choice").val();
    
      }

