const express = require("express");
const cors = require("cors");
const dbconnection = require("./config/db");
const cookieParser = require("cookie-parser");

dbconnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const apiRoutes = require("./api");

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
