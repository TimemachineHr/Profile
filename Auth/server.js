import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.json({ message: "Its working Auth Micro-service!" });
});

//Routes
import Routes from "./routes/index.js";
app.use(Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
