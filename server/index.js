import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
// import { User } from "./models/User.model.js";
// import { posts, users } from "./data/index.js";
// import { Post } from "./models/Post.model.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
// console.log(__filename)
const __dirname = path.dirname(__filename);
// console.log(__dirname)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // app.get("/", (req, res) => {
    //   app.use(express.static(path.resolve(__dirname, "build")));
    //   res.sendFile(path.resolve(__dirname, "build", "index.html"));
    // });
    app.listen(PORT, () => {
      console.log(`server Port: ${PORT}`);
    });
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => {
    console.log(`DB not connect error: ${error}`);
  });
