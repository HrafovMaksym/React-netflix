import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  registerValidation,
} from "./validations/UserValidation.js";

import CheckAuth from "./utils/CheckAuth.js";
import {
  MovieController,
  ProfileListCotroller,
  UserController,
} from "./controllers/index.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(`${process.env.DATA_BASE_CONNECT}`)
  .then(() => console.log("DataBase Working"))
  .catch((err) => {
    console.log(err, "Error");
  });
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const app = express();
app.use(cors());
app.use(express.json());
app.use("/upload", express.static("uploads"));

app.post("/upload", CheckAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

app.get("/movies/search", MovieController.getSearch);

app.get("/movies/all", MovieController.getAllMovies);
app.get("/movies/new", MovieController.getNewMovies);
app.get("/movies/popular", MovieController.popularMovies);
app.get("/movies/highRated", MovieController.ratedMovies);
app.get("/movies/trending", MovieController.trendingMovies);
app.get("/movies/upcoming", MovieController.upComingMovies);

app.get("/tv/all", MovieController.getTvShows);

app.post("/favoriteList", CheckAuth, ProfileListCotroller.addFavourite);

app.get("/allFavMovies", CheckAuth, ProfileListCotroller.getAll);

app.delete("/removeFavMovie", CheckAuth, ProfileListCotroller.removeFavourite);

app.delete(
  "/removeAllFavMovies",
  CheckAuth,
  ProfileListCotroller.removeAllFavourites
);
app.post(
  "/auth/registration",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", CheckAuth, UserController.authMe);

app.listen(port, (err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Server Working");
});
