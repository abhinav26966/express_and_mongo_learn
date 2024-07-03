const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://abhinavnagar2696:Abhi2604@cluster0.esiq0z8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
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

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
