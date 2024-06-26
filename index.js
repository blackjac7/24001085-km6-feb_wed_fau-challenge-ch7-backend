require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp", // if you're using GCP App Engine please don't comment this, because the ./tmp directory is read only and we need write too so we use /tmp
    })
);

app.use(async function (req, res, next) {
    req.io = io;
    next();
});

app.use("/api", routes);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

const httpServer = createServer(app);
const options = {
    cors: {
        origin: "*",
        methods: "*",
    },
};

const io = new Server(httpServer, options);

io.on("connection", (socket) => {
    console.log(socket.id + " connected!");

    socket.on("disconnect", (reason) => {
        console.log(socket.id + " disconnected because " + reason);
    });

    socket.on("typing", (username) => {
        console.log("typing trigger");
        io.emit("ontyping", username);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
