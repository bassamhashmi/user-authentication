require("dotenv").config();

const connectDatabase = require("./database");
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
// const path = require("path");
const cookieParser = require("cookie-parser");

// const { militaryTypeSecurity } = require("./middlewares/users");
const userRoute = require("./routes/user");

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

if (process.env.ENVIRONMENT === "dev") {
  app.use(morgan("dev"));
}

// app.use(militaryTypeSecurity);

app.use("/api/auth", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`server started > listening on PORT ${process.env.PORT}`);
});
