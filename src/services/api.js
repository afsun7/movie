import axios from "axios";
const session_id = localStorage.getItem(session);
export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e73f257fc4704818fcdc0479ca01561d",
    ...(session_id && { session_id }),
  },
});
