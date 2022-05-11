const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

// mongoose.connect(process.env.MONGODB_URL, () => {
//   console.log("CONNECTED TO MONGO DB");
// });
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

app.use(cors());
app.use(cookieParser());
// app.use(helmet());
app.use(express.json());

//ROUTES

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(port, () => {
  console.log("Server is running");
});
