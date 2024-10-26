import FavoriteSchema from "../modules/FavoriteSchema.js";

export const addFavourite = async (req, res) => {
  try {
    const doc = new FavoriteSchema({
      user: req.userId,
      filmId: req.body.filmId,
      title: req.body.title,
      poster: req.body.poster,
      date: req.body.date,
      tvTitle: req.body.tvTitle,
      navTitle: req.body.navTitle,
    });
    const list = await doc.save();
    res.json(list);
  } catch (error) {
    res.status(500).json({
      message: "Cannot add the movie",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const movies = await FavoriteSchema.find({ user: req.userId })
      .populate({
        path: "user",
        select: ["fullName", "imgUrl"],
      })
      .exec();
    res.json(movies);
  } catch (err) {
    res.status(500).json({
      message: "Cannot find the movies",
    });
  }
};
export const removeAllFavourites = async (req, res) => {
  try {
    const userId = req.userId;

    const doc = await FavoriteSchema.deleteMany({
      user: userId,
    });

    if (!doc) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movies = await FavoriteSchema.find({ user: req.userId })
      .populate({
        path: "user",
        select: ["fullName", "imgUrl"],
      })
      .exec();
    if (!movies) {
      return res.status(404).json({
        message: "List is empty",
      });
    }
    res.json(movies);
  } catch (error) {
    console.error("Error while removing movie:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Unknown error",
    });
  }
};
export const removeFavourite = async (req, res) => {
  try {
    const movieId = req.body.filmId;
    const userId = req.userId;

    console.log("Received filmId:", movieId, "for userId:", userId);

    if (!movieId) {
      return res.status(400).json({ message: "Film ID is missing" });
    }

    const doc = await FavoriteSchema.findOneAndDelete({
      user: userId,
      filmId: movieId,
    });

    if (!doc) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movies = await FavoriteSchema.find({ user: req.userId })
      .populate({
        path: "user",
        select: ["fullName", "imgUrl"],
      })
      .exec();
    if (!movies) {
      return res.status(404).json({
        message: "List is empty",
      });
    }
    res.json(movies);
  } catch (error) {
    console.error("Error while removing movie:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Unknown error",
    });
  }
};
