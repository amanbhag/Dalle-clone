import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import DalleRoutes from "./routes/DalleRoutes.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", DalleRoutes);
app.get("/", async (req, res) => {
  res.send("hello from DAll-e");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("server is started on port 8080"));
  } catch (error) {
    console.log("error from app.listen: ", error);
  }
};

startServer();
