import { Col, Divider, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { apikey, baseUrl, imgBaseURL, posterImg } from "../../apiConfig";
import Card from "../Card/Card";
import "../../module/movieSection.css";
import { NavLink } from "react-router-dom";
import SectionHeaderTwo from "./SectionHeaderTwo";

export default function Trends() {
  const [mediaType, setMediaType] = useState("day");
  const [movies, setMovies] = useState([]);
  let categorie;
  if (mediaType == "day") {
    categorie = "day";
  } else if (mediaType == "week") {
    categorie = "week";
  }

  async function getcard() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/trending/all/${categorie}?api_key=${apikey}`
      );

      setMovies(data.results);
    } catch {
      console.log("ERRRROR");
    }
  }
  useEffect(() => {
    getcard();
  }, [categorie]);

  return (
    <>
      <SectionHeaderTwo
        textH3={"Trending"}
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      <Row justify="center" gutter={16}>
        {movies.map(
          (movie) =>
            movies.indexOf(movie) < 12 && (
              <Col xs={12} sm={8} md={6} lg={4} key={movie.id}>
                <NavLink to={`/${movie.media_type}/${movie.id}`}>
                  <Card
                    src={posterImg(movie.poster_path)}
                    title={movie.title}
                    name={movie.name}
                    vote_average={movie.vote_average}
                    media_type={movie.media_type}
                  />
                </NavLink>
              </Col>
            )
        )}
      </Row>
    </>
  );
}
