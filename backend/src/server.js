import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import mongoose from "mongoose";

import { Server }
from "socket.io";

import authRoutes
from "./routes/authRoutes.js";

import userRoutes
from "./routes/userRoutes.js";

import incidentRoutes
from "./routes/incidentRoutes.js";

dotenv.config();

/* DATABASE CONNECTION */

mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {

  console.log(
    "MongoDB connected"
  );

})
.catch((error) => {

  console.log(
    error
  );

});

/* EXPRESS APP */

const app = express();

/* HTTP SERVER */

const server =
  http.createServer(app);

/* SOCKET.IO */

const io = new Server(
  server,
  {
    cors: {
      origin:
        "http://localhost:5173",

      methods: [
        "GET",
        "POST",
      ],
    },
  }
);

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* SOCKET ACCESS */

app.use(
  (req, res, next) => {

    req.io = io;

    next();

  }
);

/* API ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/incidents",
  incidentRoutes
);

/* ROOT ROUTE */

app.get(
  "/",
  (req, res) => {

    res.json({
      message:
        "NEXUS backend online",
    });

  }
);

/* SOCKET CONNECTION */

io.on(
  "connection",
  (socket) => {

    console.log(
      "Client connected:",
      socket.id
    );

    socket.emit(
      "system:message",
      {
        message:
          "Realtime infrastructure channel active",
      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "Client disconnected:",
          socket.id
        );

      }
    );

  }
);

/* SERVER START */

const PORT =
  process.env.PORT || 5000;

server.listen(
  PORT,
  () => {

    console.log(
      `NEXUS backend running on port ${PORT}`
    );

  }
);