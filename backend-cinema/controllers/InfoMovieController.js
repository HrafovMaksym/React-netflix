import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export const genresMovie = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
      headers: { accept: "application/json" },
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get genres",
    });
  }
};
