const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Category = require("../model/category");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

//create category
router.post("/create-category", async (req, res, next) => {
  try {
    const categoryData = {
      name: req.body.name,
      parentCategory: req.body.parentCategory,
      image: req.body.image,
    };
    console.log(categoryData);
    const category = await Category.create(categoryData);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//get all category
// get all products of a shop
router.get(
  "/get-all-categories",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
