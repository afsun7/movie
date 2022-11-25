import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { apikey, baseUrl, imgBaseURL, posterImg } from "../../apiConfig";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import "../../module/swiper.css";

export default function SwiperSection() {
  const [Bg, setBg] = useState(
    "https://image.tmdb.org/t/p/w780//6oZeEu1GDILdwezmZ5e2xWISf1C.jpg"
  );
  const [mediaType, setMediaType] = useState("movie");
  const [movies, setMovies] = useState([]);

  function handleBg(path) {
    return setBg(posterImg(path, "original"));
  }
  let categorie;
  if (mediaType == "movie") {
    categorie = "movie";
  } else if (mediaType == "tv") {
    categorie = "tv";
  }

  async function getPopularMovies() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/${categorie}/popular?api_key=${apikey}`
      );

      setMovies(data.results);
    } catch {
      console.log("ERRRROR");
    }
  }
  useEffect(() => {
    getPopularMovies();
  }, [categorie]);

  return (
    <div
      style={{
        background: `url(${Bg})`,
      }}
      className="forBg"
    >
      <SectionHeader
        className="BringFront"
        textH3={"Free To Watch"}
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            onMouseOver={() => handleBg(movie.backdrop_path)}
          >
            <NavLink to={`/${categorie}/${movie.id}`}>
              <div className="item">
                <img
                  src={posterImg(movie.poster_path)}
                  alt={movie.title}
                  className="img"
                />

                <div className="name">
                  {movie.title}
                  {movie.name}
                </div>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
