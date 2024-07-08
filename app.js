const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isinStock: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

app.post("/api/products", async (req, res) => {
  const product = productModel.create({
    name: req.body.name,
    price: req.body.price,
    isinStock: req.body.isinStock,
    category: req.body.category,
  });

  console.log(product);

  return res.status(200).json({ message: "Product created successfully" });
});
app.get("/api/products", async (req, res) => {
  const products = await productModel.find();
  return res.status(200).json(products);
})

app.get("/api/products/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  return res.status(200).json(product);
});

app.put("/api/products/:id", async (req, res) => {
  const product = await productModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  return res.status(200).json(product);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
