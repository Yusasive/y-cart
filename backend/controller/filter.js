const express = require("express");
const Product = require("../model/product");
const router = express.Router();

const buildQuery = (filters) => {
  const query = {};

  if (Array.isArray(filters.categories)) {
    query.categories = { $in: filters.categories };
  } else if (filters.categories !== undefined) {
    query.categories = filters.categories;
  }

  if (filters.priceMin && filters.priceMax) {
    query.price = { $gte: filters.priceMin, $lte: filters.priceMax };
  } else if (filters.priceMin) {
    query.price = { $gte: filters.priceMin };
  } else if (filters.priceMax) {
    query.price = { $lte: filters.priceMax };
  }

  if (Array.isArray(filters.brands)) {
    query.brands = { $in: filters.brands };
  } else if (filters.brands !== undefined) {
    query.brands = filters.brands;
  }

  if (Array.isArray(filters.colors)) {
    query.colors = { $in: filters.colors };
  } else if (filters.colors !== undefined) {
    query.colors = filters.colors;
  }

  return query;
};

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 40, ...filters } = req.query;
    const query = buildQuery(filters);
    console.log(query);

    const products =
      Object.keys(query).length === 0
        ? await Product.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
        : await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "filters error" });
  }
});

module.exports = router;
