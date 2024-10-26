import React from "react";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./scss/styles.scss";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { fetchAuth } from "./redux/Slices/auth";

import Headerlayout from "./layouts/Headerlayout";
import Popular from "./pages/Popular";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";

import SimilarFilm from "./pages/SimilarFilm";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import TvShows from "./pages/TvShows";
import Error500 from "./components/Errors/Error500";

import FullContent from "./pages/FullContent";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Home/" element={<Headerlayout />}>
        <Route path=":navTitle/:category/:id" element={<FullContent />} />
        <Route path=":navTitle/:id" element={<FullContent />} />
        <Route
          path="Movies/:category"
          element={<Navigate to={"/Home/Movies"} replace />}
        />
        <Route
          path="TvShows/:category"
          element={<Navigate to={"/Home/TvShows"} replace />}
        />
        <Route
          path="New&Popular/:category"
          element={<Navigate to={"/Home/New&Popular"} replace />}
        />

        <Route path=":navTitle/:id/Similar/:id" element={<SimilarFilm />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="TvShows" element={<TvShows />} />
        <Route path="New&Popular" element={<Popular />} />
        <Route path="Profile/Edit" element={<Profile />} />
        <Route path="MyList/*" element={<MyList />} />
        <Route path="MyList/:navTitle/:id" element={<FullContent />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/500-error-page" element={<Error500 />} />

      <Route path="/Auth/Login" element={<SignIn />} />
      <Route path="/Auth/Registration" element={<SignUp />} />
    </Routes>
  );
};

export default App;
