import express from "express";
import router from "./src/routes/requestRoute.js";
import uploadRouter from "./src/routes/uploadRoute.js";
import cors from "cors";
import path from "path";

const PORT = 5000;
const app = express();

app.use(cors({ origin: "*" })); // Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRouter);
app.use("/api", router);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
