import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apikey, baseUrl, imgBaseURL, posterImg } from "../../apiConfig";
import Card from "../Card/Card";
import { Pagination } from "antd";
import "../../module/movies.css";

export default function Movies() {
  const [totalPage, setTotalPage] = useState();
  const [movies, setMovies] = useState([]);
  const { types, categories } = useParams();
  //pagination
  const [current, setCurrent] = useState(1);
  //pagination

  async function getcard() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/${types}/${categories}?api_key=${apikey}&page=${current}`
      );

      setMovies(data.results);
      setTotalPage(data.total_results);
    } catch {
      console.log("ERRRROR");
    }
  }
  useEffect(() => {
    getcard();
  }, [categories, current, types]);

  //pagination code

  function onChange(number) {
    setCurrent(number);
  }
  //pagination

  return (
    <>
      <Header />
      <Row justify="center" gutter={16} id="moviesCard">
        {movies.map(
          (movie) =>
            movies.indexOf(movie) < 18 && (
              <Col xs={12} sm={8} md={6} lg={4} key={movie.id}>
                {/* <NavLink to={`/${movie.media_type}/${movie.id}`}> */}
                <Card
                  src={posterImg(movie.poster_path)}
                  title={movie.title}
                  name={movie.name}
                  vote_average={movie.vote_average}
                  media_type={types === "movie" ? "movie" : "tv"}
                />
                {/* </NavLink> */}
              </Col>
            )
        )}
      </Row>
      <Pagination
        defaultCurrent={1}
        current={current}
        total={totalPage && Math.ceil(totalPage / 18)}
        onChange={(number) => onChange(number)}
        id="pagination"
      />
      <Footer />
    </>
  );
}
