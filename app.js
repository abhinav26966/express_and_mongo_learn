const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { Route, useRoutes } = require('react-router-dom');
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use('/api/products',productRoutes);

app.use('/api/users',userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
