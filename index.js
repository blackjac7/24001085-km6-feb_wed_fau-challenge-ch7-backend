require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World Binarians!");
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
