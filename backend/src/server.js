import express from "express";
import router from "./routes/requestRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRouter);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
