const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//const helmet = require("helmet");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoute');

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connected'))
  .catch((e) => console.log(e));

app.use(cors());
app.use(cookieParser());
// app.use(helmet());
app.use(express.json());

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/v1/auth', authRoute);

app.listen(8000, () => {
  console.log('Server is running');
});
