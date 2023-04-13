import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import domainRoutes from "./routes/domain.js";
import userInfoRoutes from "./routes/userInfo.js";

const app = express();
const server = createServer(app);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/userinfo", userInfoRoutes);

io.on("connection", (socket) => {
  console.log(socket.id);
});

const connected_url =
  "mongodb+srv://pranavGriindset:pranavGriindset1234@testgriindset.iptobix.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

mongoose
  .connect(connected_url)
  .then(() => {
    server.listen(port, (req, res) => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
