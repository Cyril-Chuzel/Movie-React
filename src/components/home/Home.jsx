import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchMovieByGenre,
  fetchTopratedMovie,
  fetchSearch,
} from "../../service";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Home({}) {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [search, setSearch] = useState("");
  const [topRated, setTopRated] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setMovieByGenre(await fetchMovieByGenre(28));
      setTopRated(await fetchTopratedMovie());
    };

    fetchAPI();
  }, []);

  const fetchTest= (event) => {
    setSearch(event.target.value);
    if (event.target.value.trim().length) {
      fetchSearch(event.target.value).then(data =>{
       setSearchedMovies(data)
      }) 
    } else {
      setSearchedMovies([])
    }
  } 

  // movies corresponds to the part of our first page
  // that use the carousel and place inside  the different information when we can find in the page of the localhost
  // using the data of the movie recovered from the nowPlaying
  const movies = nowPlaying.slice(0, 4).map((item) => {
    return (      
      <Link to={`/movie/${item.id}`}>
        <div style={{ height: 500, width: "100%", position: "relative", top: 0, background: "#FFECDE" }} key={item.id}>
          <div className="carousel-center">
            
            <img style={{ height: 500, position: "absolute", top: -250, right: 100 }} src={item.poster} alt={item.title} />
            
          </div>
          <div className="carousel-center">
              <p style= {{ fontWeight: "bolder", fontSize: 30, position: "relative", left: 200, top: -190, color: "#000000"}}>{item.title}</p>
          </div>
          <div className="carousel-center">
            <p style={{ fontWeight: "bolder", position: "relative", left: 40, top: 60, color: "#000000" }}>RELEASE DATE</p>
            <p style={{ position: "relative", left: 40, top: 50, color: "#000000" }}>{item.release_date}</p> 
            <p style={{ fontWeight: "bolder", position: "relative", left: 40, top: 80, color: "#000000" }}>VOTE COUNT</p>
            <p style={{ position: "relative", left: 40, top: 70, color: "#000000" }}>{item.vote_count}</p> 
            <p style={{ fontWeight: "bolder", position: "relative", left: 300, top: -100, color: "#000000" }}>ORIGINAL LANGUAGE</p>
            <p style={{ position: "relative", left: 300, top: -110, color: "#000000", textTransform: "uppercase" }}>{item.original_language}</p> 
            <div style= {{position: "relative", left: -265, top: 190, color: "#000000"}} className="carousel-center">
              <ReactStars
                count= {1}
                size={50}
                color1={"#f4c10f"}
                edit= {false}
              ></ReactStars>
              <p style= {{ fontWeight: "bolder", fontSize: 30, color: "#ffffff", position: "relative", top: -55, left: 45 }}>{item.rating}</p>
              <img style={{ height: 200, position: "absolute", top: -140, left: 500 }} src={item.backPoster} alt={item.title} />  
            </div>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >            
          </div>
        </div>
      </Link>
    );
  });
  
  // movieList will allow us to display the different posters 
  // of the film with the different votes in the form of stars and different
  // from the 8 films that are in the trends.
  const movieList = movieByGenre.slice(0, 8).map((item) => {
    return (
      <div className="col-md-3 col-sm-6" key={item.id}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          {/* ReactStars is used to show the rating of the film with a system of stars,
          going from 0 to 5. */}
          <ReactStars
            value={item.rating / 2}
            color1={"#aaaaaa"}
            size={20}
            half= {true}
            edit= {false}
          ></ReactStars>
        </div>
      </div>
    );
  });
  const topRatedList = topRated.slice(0, 8).map((item) => {
    return (
      <div className="col-md-3" key={item.id} style={{marginBottom: 100}}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <ReactStars
            half= {true}
            edit= {false}
            value={item.rating / 2}
            color1={"#aaaaaa"}
            size={20}
          ></ReactStars>
        </div>
      </div>
    );
  });

  // Once we have entered a text in the search bar,
  // all movies corresponding will appear thanks to SearchedMovieList
  // which will allow us to retrieve the information to display 
  // the title, poster and votes as starsof the movies
  const searchedMoviesList = searchedMovies.map((item) => {
    return (
      <div className="col-md-3" key={item.id}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={"https://image.tmdb.org/t/p/w300"+item.poster_path} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <ReactStars
            value={item.vote_average / 2}
            color1={"#aaaaaa"}
            size={20}
            half= {true}
            edit= {false}
          ></ReactStars>
        </div>
      </div>
    );
  });

  // The header is composed of the logo of the site, a wen icon and a research bar.
  // It is fixed to the screen, wich mean it will stay in place whe the user of the page scrolls.
  // The research bar is an input, wich take the text entered as a value and use it with fetchTest
  // to call the list of matching film, and then display them with title, poster and rating.
  return (
    <div>
      <div className= "header" style={{height: 80, width: "100%", background: "#FFECDE", position: "fixed", zIndex: 1 , top: 0 , padding: 20, textAlign: "center" }}>
        <form>
          <label>
            <input style={{width: 600}} type="text" value={search} name="name" onChange={fetchTest}  />
          </label>
        </form>
        <img style= {{position: "relative", width: "2.5%", top: -58, left: -290}}  src="./loupe.png" alt="loupe"></img>
        <img style= {{position: "relative", width: "6%", top: -54, left: -500}}  src="./icon.png" alt="icon site"></img>
      </div>
      <div style= {{position:"relative", top: 80}} className="container">
        <div className="row mt-3">{searchedMoviesList}</div>
      </div>
      <div style= {{position:"relative", top: 80}} className="container">
        <div className="row mt-2">
          <div className="col">
          {/* Inside the RBCaroussel we have put some data to customize the carousel:
          the autoplay allows the carousel to slide by himself and show different movies,
          the slideshowspeed determining how many time it take in miliseconds (5000ms= 5s)
          After the RBCarrousel, we call the movie const 
          which allows us to display a diffrent film for each slide */}
            <RBCarousel
              autoplay={true}
              pauseOnVisibility={true}
              slidesshowSpeed={5000}
              version={4}
              indicators={false}
            >
              {movies}
            </RBCarousel>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <p className="font-weight-bold" style={{ color: "#5a606b", position: "relative", top: 30 }}>
              TENDANCES
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="float-right">
            </div>
          </div>
        </div>
        <div className="row mt-3">{movieList}</div>      
        <div className="row mt-3">
          <div className="col">
            <p className="font-weight-bold" style={{ color: "#5a606b", position: "relative", top: 30 }}>
              TOP RATED MOVIES
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="float-right">
            </div>
          </div>
        </div>
        <div className="row mt-3">{topRatedList}</div>


        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b"}}></hr>

        {/* the footer display the adress of the HETIC campus and a link to the official site
        if you click on the HETIC logo. 
        There is also the different members of the groupe and the date of the project,
        and finally a link to the homepage with the house logo.  */}
        <div className="row mt-3 mb-5">
          <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>
            <ul className="list-unstyled">
              <li>
               <p>
                  <i className="fas fa-map-marker-alt"></i><strong> Address:</strong> 27 Bis Rue du Progrès, 93100 Montreuil 
                </p>
              </li>
              <li>
                <a href="https://www.hetic.net/" target="blank">
                  <img style={{width: 120, position:"relative", left: -10}} src="./hetic.png" alt="logo HETIC" ></img>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-5" style={{ color: "#5a606b" }}>
            <a href="http://localhost:3000/">
              <img style={{width: 100, position: "relative", left: 100}} src="./homepage.png" alt="homepage" ></img>
            </a>
          </div>
        </div>
        <p style={{textAlign: "center", marginBottom: 100}}>© 2021 by Merwan Mahiout / Cyril Chuzel / Floriane Ryan / Kylian Ferrandez / Théo Sciancalepore / Lancelot Perinet-Marquet</p>
      </div>
    </div>
  );
}
