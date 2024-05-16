require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api", routes);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
