const express = require("express");
const router = express.Router();
const client = require("./elastic");
const Product = require("../model/product");

// Function to index all existing products in Elasticsearch

async function indexExistingProducts() {
  try {
    // Retrieve all products from MongoDB
    const allProducts = await Product.find();

    // Index each product in Elasticsearch
    for (const product of allProducts) {
      await client.index({
        index: "products",
        id: product._id.toString(), // Set the document ID from the _id field
        body: { ...product.toObject(), _id: undefined }, // Exclude _id from the document body
      });
    }

    console.log("All existing products indexed in Elasticsearch.");
  } catch (error) {
    console.error("Error indexing existing products:", error);
  }
}

// Route to trigger indexing of existing products in Elasticsearch
router.post("/", async (req, res) => {
  try {
    // Call the function to index existing products
    await indexExistingProducts();

    // Send a success response
    res
      .status(200)
      .json({ message: "Indexing of existing products completed." });
  } catch (error) {
    // Handle errors by logging and returning a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
