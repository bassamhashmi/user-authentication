require("dotenv").config();

const connectDatabase = require("./database");
const express = require("express");

const userRoute = require("./routes/user");

const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.ENVIRONMENT === "dev") {
  app.use(morgan("dev"));
}

app.use("/api/auth", userRoute);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")),
    function (error) {
      if (error) {
        res.status(500).json({ message: error });
      }
    };
});

app.listen(process.env.PORT, () => {
  console.log(`server started > listening on PORT ${process.env.PORT}`);
});
