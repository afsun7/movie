import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, apikey, posterImg } from "../../apiConfig";
import Footer from "../Footer/Footer";
import Header from "../header/Header";
import "../../module/movie.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import {
  BookFilled,
  BookOutlined,
  HeartFilled,
  HeartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default function Movie() {
  const [movie, setMovie] = useState(null);

  const [isFavorite, setIsfavorite] = useState(false);

  const { media_type, movieId } = useParams();

  const [isWatchList, setIsWatchlist] = useState(false);

  const {
    user,
    session,
    favoriteMovie,
    getFavoriteMove,
    watchListMove,
    getFavoriteTv,
    getWatchListMovie,
    getWatchListtv,
  } = useContext(UserContext);

  //useEffect for favoritemovie
  useEffect(() => {
    if (movie && favoriteMovie.length) {
      const chekFavorite = favoriteMovie.find((item) => item.id === movie?.id);
      setIsfavorite(Boolean(chekFavorite));
      console.log(isFavorite);
    }
  }, [movie, favoriteMovie]);

  //useEffect for watchListMove
  useEffect(() => {
    if ((movie, watchListMove.length)) {
      const checkWtatchList = watchListMove.find(
        (item) => item.id === movie?.id
      );
      setIsWatchlist(Boolean(checkWtatchList));
    }
    console.log(isWatchList);
  }, [movie, watchListMove]);

  // get media-type
  let mediaType;
  if (media_type == "movie") {
    mediaType = "movie";
  } else {
    mediaType = "tv";
  }

  //
  async function getMovie() {
    try {
      let response = await fetch(
        `${baseUrl}/${mediaType}/${movieId}?api_key=${apikey}&append_to_response=videos`
      );
      let data = await response.json();
      setMovie(data);
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    getMovie();
  }, [movieId]);

  // function to add favorite movie

  async function handelAddFavorite() {
    if (session) {
      const result = await axios.post(
        `${baseUrl}/account/${user.id}/favorite?api_key=${apikey}&session_id=${session}`,
        {
          media_type: `${mediaType}`,
          media_id: movie.id,
          favorite: !isFavorite,
        }
      );
      console.log(result);
      getFavoriteMove(user.id);
      getFavoriteTv(user.id);

      toast.success(
        `${movie.title || movie.name}${
          isFavorite ? " Remove from favorite" : " Add to favorite"
        }`,
        {
          style: { backgroundColor: "#eec932", color: "#000" },
          position: "center",
        }
      );
    } else {
      toast.error("Please Login", {
        style: { backgroundColor: "#eec932", color: "#000" },
        position: "center",
      });
    }
  }
  //function to add watchlist
  async function handelAddWatchList() {
    if (session) {
      const result = await axios.post(
        `${baseUrl}/account/${user.id}/watchlist?api_key=${apikey}&session_id=${session}`,
        {
          media_type: `${mediaType}`,
          media_id: movie.id,
          watchlist: !isWatchList,
        }
      );
      console.log(movie);
      getWatchListMovie(user.id);
      getWatchListtv(user.id);
      toast.success(
        `${movie.title || movie.name}${
          isWatchList ? " Remove from watchList" : " Add to watchList"
        }`,
        {
          style: { backgroundColor: "#eec932", color: "#000" },
          position: "center",
        }
      );
    } else {
      toast.error("Please Login", {
        style: { backgroundColor: "#eec932", color: "#000" },
        position: "center",
      });
    }
  }
  return (
    <>
      <Header />
      {movie ? (
        <>
          <div
            className="container"
            style={{
              background: `url(${posterImg(movie.backdrop_path, "original")})`,
            }}
          ></div>
          <div className="contain-box">
            <img src={posterImg(movie.poster_path)} id="poster_img" />
            <div className="movie_details">
              <span>{mediaType == "movie" ? movie.title : movie.name}</span>
            </div>
            <div id="overview">
              <p>{movie ? "Overview" : ""}</p>
              {movie.overview}
              <div className="div-btn">
                {isFavorite ? (
                  <>
                    <button
                      className="custom-btn"
                      style={{ border: `1px solid #fcd535` }}
                      onClick={handelAddFavorite}
                    >
                      <HeartFilled
                        style={{ fontSize: "20px", color: "#fcd535" }}
                      />
                    </button>
                    <span>Remove from favorite</span>
                  </>
                ) : (
                  <>
                    <button
                      className="custom-btn"
                      style={{ border: `1px solid #fff` }}
                      onClick={handelAddFavorite}
                    >
                      <HeartOutlined style={{ fontSize: "20px" }} />
                    </button>
                    <span>Add to favorite</span>
                  </>
                )}
                {isWatchList ? (
                  <>
                    <button
                      className="custom-btn"
                      style={{ border: `1px solid #fcd535` }}
                      onClick={handelAddWatchList}
                    >
                      <BookFilled
                        style={{ fontSize: "20px", color: "#fcd535" }}
                      />
                    </button>
                    <span>Remove to watchList</span>
                  </>
                ) : (
                  <>
                    <button
                      className="custom-btn"
                      style={{ border: `1px solid #fff` }}
                      onClick={handelAddWatchList}
                    >
                      <BookOutlined style={{ fontSize: "20px" }} />
                    </button>
                    <span>Add to watchList</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            {/* {movie.videos.results.map((video) => (
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
              ></iframe>
            ))} */}
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
      <Footer />
    </>
  );
}
