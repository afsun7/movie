import { NavLink } from "react-router-dom";

export default function () {
  return (
    <nav className="navigate">
      <ul>
        <li>
          <NavLink to="/">Hex download</NavLink>
        </li>
        <li>
          <a href="#" className="navAnchor">
            Movies
          </a>
          <ul className="UlExtension">
            <NavLink to="/get/movie/popular">
              <li>Popular</li>
            </NavLink>
            <NavLink to="/get/movie/now_playing">
              <li>Now Playing</li>
            </NavLink>
            <NavLink to="/get/movie/upcoming">
              <li>Upcoming</li>
            </NavLink>
            <NavLink to="/get/movie/top_rated">
              <li>Top Rated</li>
            </NavLink>
          </ul>
        </li>
        <li>
          <a href="#" className="navAnchor">
            TV Shows
          </a>
          <ul className="UlExtension">
            <NavLink to="/get/tv/popular">
              <li>Popular</li>
            </NavLink>
            <NavLink to="/get/tv/airing_today">
              <li>Airing Today</li>
            </NavLink>
            <NavLink to="/get/tv/on_the_air">
              <li>On TV</li>
            </NavLink>
            <NavLink to="/get/tv/top_rated">
              <li>Top Rated</li>
            </NavLink>
          </ul>
        </li>
        {/* <li>
          <a href="#" className="navAnchor">
            People
          </a>
          <ul className="UlExtension">
            <li>Popular People</li>
          </ul>
        </li> */}
      </ul>
    </nav>
  );
}
