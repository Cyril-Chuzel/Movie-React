import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchSimilarMovie,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            half= {true}
            value={detail.vote_average / 2}
            color1={"#aaaaaa"}
            size={20}
            edit= {false}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>VOTE AVERAGE : {detail.vote_average / 2} / 5</p>
        </div>
      </div>

      <div className="col">
        <div className="text-center">
          <ReactStars
            half= {true}
            edit= {false}
            value={detail.vote_average / 2}
            color1={"#aaaaaa"}
            size={30}
          ></ReactStars>
        </div>

        <div className="row mt-3">
          <div className="col">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <ul className="list-inline">{genresList}</ul>
          </div>
        </div>

        <div className="row mt-3">
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#000000" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#000000" }}>{detail.runtime} minutes</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>HOMEPAGE</p>
          <a href= {detail.homepage} target= "blank" style={{ color: "#000000", textDecoration: "none" }} >
            <p >Voir le site du film</p>
          </a> 
        </div>
      </div>


      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

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
                <img style={{ width: 120, position: "relative", left: -10 }} src="../hetic.png" alt="logo HETIC" ></img>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-5" style={{ color: "#5a606b" }}>
          <a href="http://localhost:3000/">
            <img style={{ width: 100, position: "relative", left: 100 }} src="../homepage.png" alt="homepage" ></img>
          </a>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: 100 }}>© 2021 by Merwan Mahiout / Cyril Chuzel / Floriane Ryan / Kylian Ferrandez / Théo Sciancalepore / Lancelot Perinet-Marquet</p>
    </div>
  );
}
