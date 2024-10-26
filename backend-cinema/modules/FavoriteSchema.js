import mongoose from "mongoose";
const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    filmId: {
      required: true,
      type: Number,
    },
    title: {
      type: String,
    },
    tvTitle: {
      type: String,
    },
    navTitle: {
      type: String,
    },
    poster: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Favorite", FavoriteSchema);
