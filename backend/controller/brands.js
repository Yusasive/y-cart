const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Brands = require("../model/brands");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

//create category
router.post("/create-brand", async (req, res, next) => {
  try {
    const { name, image } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "brands",
    });
   
    const brand = await Brands.create({
      name: name,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      brand,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//get all category 
// get all products of a shop
router.get(
  "/get-all-brands",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const brands = await Brands.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        brands,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

  module.exports = router;