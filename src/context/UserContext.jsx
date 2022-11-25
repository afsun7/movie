import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//api-key & baseurl
const api_key = "e73f257fc4704818fcdc0479ca01561d";
const baseURL = "https://api.themoviedb.org/3";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState(() => localStorage.getItem("session"));

  const [favoriteMovie, setFavoriteMovie] = useState([]);

  const [watchListMove, setWatchList] = useState([]);

  async function getUserData() {
    const { data } = await axios.get(
      `${baseURL}/account?api_key=${api_key}&session_id=${session}`
    );

    //call function favorite Movie
    getFavoriteMove(data.id);

    //call function favorite tv
    getFavoriteTv(data.id);

    //call function getwatchListmovie
    getWatchListMovie(data.id);

    //call function getwatchListtv
    getWatchListtv(data.id);

    setUser(data);
  }

  //favorite Movie
  async function getFavoriteMove(id) {
    const favorite = await axios.get(`
     ${baseURL}/account/${id}/favorite/movies?api_key=${api_key}&session_id=${session}`);
    setFavoriteMovie(favorite.data.results);
  }
  //favorite tv
  async function getFavoriteTv(id) {
    const favorite = await axios.get(`
     ${baseURL}/account/${id}/favorite/tv?api_key=${api_key}&session_id=${session}`);
    setFavoriteMovie(favorite.data.results);
  }

  //get watchList movies
  async function getWatchListMovie(id) {
    const watchList = await axios.get(`
    ${baseURL}/account/${id}/watchlist/movies?api_key=${api_key}&session_id=${session}`);
    console.log(watchList.data.results);
    setWatchList(watchList.data.results);
  }

  //get watchList tv
  async function getWatchListtv(id) {
    const watchList = await axios.get(`
    ${baseURL}/account/${id}/watchlist/tv?api_key=${api_key}&session_id=${session}`);
    console.log(watchList.data.results);
    setWatchList(watchList.data.results);
  }

  //check null or fill session
  useEffect(() => {
    getUserData();
  }, [session]);

  //function for login in component Sign in
  async function login(username, password) {
    try {
      const tokenResult = await axios.get(
        `${baseURL}/authentication/token/new?api_key=${api_key}`
      );
      // console.log(tokenResult.data.request_token);

      const authentication = await axios.post(
        ` ${baseURL}/authentication/token/validate_with_login?api_key=${api_key}`,
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );

      const session = await axios.post(
        `${baseURL}/authentication/session/new?api_key=${api_key}`,
        {
          request_token: tokenResult.data.request_token,
        }
      );

      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);

      navigate("/", { replace: true });
    } catch {
      toast.error("Invalid username or password.", {
        style: { backgroundColor: "#eec932", color: "#000" },
      });
      setLoading(false);
    }
  }
  function logOut() {
    setUser(null);
    setSession(null);
    localStorage.clear();
  }
  //
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        session,

        loading,
        setLoading,
        logOut,
        favoriteMovie,
        getFavoriteMove,
        getUserData,
        watchListMove,
        getWatchListMovie,
        getWatchListtv,
        getFavoriteTv,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
