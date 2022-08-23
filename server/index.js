require("dotenv").config();

const express = require("express");
const connectDatabase = require("./database");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const cors = require("cors");

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.ENVIRONMENT === "dev") {
  app.use(morgan("dev"));
}

app.use("/auth", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`server started > listening on PORT ${process.env.PORT}`);
});
