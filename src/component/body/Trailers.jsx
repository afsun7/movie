import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apikey, baseUrl, imgBaseURL, posterImg } from "../../apiConfig";
import { Col, Divider, Radio, Row } from "antd";
import "../../module/SectionHeader.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "../../module/swiper.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export default function Trailers() {
  const [movies, setMovies] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [MoviesWithFilter, setMoviesWithFilter] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [videoToShow, setVideoToShow] = useState();
  const [Bg, setBg] = useState();

  //modal start

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowMovie(false);
  };
  //modal end

  async function getPopularMovies() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/${mediaType}/popular?api_key=${apikey}&append_to_response=videos`
      );
      setMovies(data.results);
    } catch {
      console.log("ERRRROR");
    }
  }
  useEffect(() => {
    getPopularMovies();
  }, [mediaType]);

  function handleClick(action) {
    switch (action) {
      case "movie":
        return setMediaType("movie");
      case "tv":
        return setMediaType("tv");
    }
  }

  function fetchingMoviesWithVideos(id) {
    return axios.get(
      `${baseUrl}/${mediaType}/${id}?api_key=${apikey}&append_to_response=videos`
    );
  }

  async function getMovieWithVideos() {
    const moviesComeWithVideos = await Promise.all(
      movies.map((movie) => fetchingMoviesWithVideos(movie.id))
    );
    const moviesComeWithVideosFiltered = moviesComeWithVideos.filter(
      (item) => item.data.videos.results.length > 0
    );
    setMoviesWithFilter(moviesComeWithVideosFiltered);
  }

  useEffect(() => {
    getMovieWithVideos();
  }, [movies]);

  function handleShowMovie(item) {
    console.log(item);
    setShowMovie(true);
    setVideoToShow(item);
    setIsModalOpen(true);
  }
  function handleBg(path) {
    return setBg(posterImg(path, "original"));
  }

  return (
    <div>
      <div
        style={{
          background: `url(${Bg})`,
          marginTop: 100,
        }}
        className="forBg"
      >
        <div>
          <div className="section-header" style={{ marginTop: 50 }}>
            <h3>Popular Trailers</h3>
            <section className="toggle_section">
              <div>
                <Row>
                  <Col span={12}>
                    <Radio.Group defaultValue="Movies" buttonStyle="solid">
                      <Radio.Button
                        onClick={() => handleClick("movie")}
                        value="Movies"
                      >
                        Movies
                      </Radio.Button>
                      <Radio.Button
                        onClick={() => handleClick("tv")}
                        value="tv"
                      >
                        TV
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                </Row>
              </div>
            </section>
          </div>
          <div>
            {MoviesWithFilter.length > 0 ? (
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
                {MoviesWithFilter.map((item, index) => (
                  <SwiperSlide
                    key={item.index}
                    onMouseOver={() => handleBg(item.data.backdrop_path)}
                  >
                    <div className="item">
                      <img
                        src={posterImg(item.data.poster_path)}
                        alt={
                          item.data.original_title || item.data.original_name
                        }
                        className="img"
                        onClick={() => handleShowMovie(item)}
                      />
                      <PlayCircleOutlined
                        onClick={() => handleShowMovie(item)}
                      />
                      <h3 className="name">
                        {item.data.title || item.data.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <h2>loading...</h2>
            )}
          </div>
        </div>
      </div>
      <div>
        {showMovie && (
          <>
            <Modal
              title="Trailer"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              style={{ backgroundColor: "black", padding: 0 }}
            >
              <iframe
                className="iframe"
                allowfullscreen="true"
                width="520"
                height="335"
                src={`https://www.youtube.com/embed/${videoToShow.data.videos.results[0].key}`}
              ></iframe>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
