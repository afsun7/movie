import { createBrowserRouter } from "react-router-dom";
import Home from "./component/pages/Home";
import Movies from "./component/pages/Movies";
import Movie from "./component/pages/Movie";
import LogIn from "./component/pages/LogIn";
import App from "./App";
import Header from "./component/header/Header";
import SectionHeader from "./component/body/SectionHeader";
import SignIn from "./component/form/SignIn";
import Footer from "./component/Footer/Footer";
import UserProvider from "./context/UserContext";
import Profile from "./component/pages/Profile";

export const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Header />
            <Home />
            <Footer />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <SignIn />
          </>
        ),
      },
      {
        path: "/:media_type/:movieId",
        element: <Movie />,
      },
      {
        path: "/get/:types/:categories/",
        element: <Movies />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
