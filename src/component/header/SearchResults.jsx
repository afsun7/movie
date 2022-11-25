import { useEffect, useState } from "react";
import { apikey, baseUrl, imgBaseURL, posterImg } from "../../apiConfig";
import axios from "axios";
import { Space, Spin } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

export default function SearchResults(props) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  //handle searchbox start
  if (props.menuOpen) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "initial";

  function closeSearchBox() {
    props.setIsSearchOpen(false);
    props.setMenuOpen(false);
    setIsLoading(false);
    setInputValue("");
    setResult([]);
  }
  //handle searchbox end
  function handleChange(e) {
    setInputValue(e.target.value);
    setIsLoading(true);
  }

  //suggestion result onChange start
  async function giveSuggestion() {
    if (inputValue.length) {
      setIsLoading(false);
      try {
        const { data } = await axios.get(
          `${baseUrl}/search/movie?api_key=${apikey}&query=${inputValue}`
        );
        console.log(data.results);
        setResult(data.results);
      } catch {
        setIsLoading(false);
        console.log("error");
      }
    } else {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      giveSuggestion();
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  //suggestion result onChange end

  //suggestion result onSubmit start

  async function search(e) {
    setQuery(inputValue);
    if (e) e.preventDefault();
    setInputValue("");
    setIsLoading(true);
    if (query)
      try {
        const { data } = await axios.get(
          `${baseUrl}/search/movie?api_key=${apikey}&query=${query}`
        );
        setResult(data.results);
        setIsLoading(false);
        console.log(data.results);
      } catch {
        setIsLoading(false);
        console.log("error");
      }
  }
  useEffect(() => {
    if (query) search();
  }, [query]);

  //suggestion result onSubmit end

  return (
    <div className={`search_box${props.isSearchOpen ? " opened" : ""}`}>
      <div className="search_box_header">
        <div className="search_box_header_close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            onClick={closeSearchBox}
          >
            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
          </svg>
        </div>
      </div>
      <div className="search_box_body_wrapper">
        <form
          className="search_box_body_form"
          action=""
          method="get"
          onSubmit={search}
        >
          <button type="submit" className="search_box_body_form_btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path>
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            name="search"
            className="search_box_body_form_input"
            placeholder="Search here..."
            autocomplete="off"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {isLoading && (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            )}
          </div>
        </form>
        <div className="search_box_body_results">
          {result.length != 0
            ? result.map((item) => (
                <div className="search_box_body_results_item">
                  <img
                    src={posterImg(item.poster_path)}
                    alt={item.title}
                    className="search_box_body_results_item_img"
                  />
                  <div className="search_box_body_results_item_details">
                    <NavLink
                      to={`/movie/${item.id}`}
                      className="search_box_body_results_item_details_title"
                    >
                      <h3 className="search_box_body_results_item_details_title_txt">
                        {`${item.title} (${item.release_date.slice(0, 4)})`}
                      </h3>
                    </NavLink>
                    <span className="search_box_body_results_item_details_imdb">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9 1.7 7.6 1.4 16.3 1.4 24.4 0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2 21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2.3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7-6 0-4.9 8.9-4.9 12.7 0 .6-1.1 39.6 1.1 44.7.8 1.6 2.2 2.4 3.8 2.4 7.8 0 6.2-9 6.2-14.4z"></path>
                      </svg>
                      {item.vote_average}
                    </span>
                    <p className="search_box_body_results_item_details_excerpt">
                      {item.overview}
                    </p>
                  </div>
                </div>
              ))
            : inputValue.length != "" && (
                <h6 className="no_results">No results found!</h6>
              )}
        </div>
      </div>
    </div>
  );
}
