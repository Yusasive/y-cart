const express = require("express");
const Subscriber = require("../model/subscribers"); // Assuming you have a Subscriber model
const router = express.Router();
const ErrorHandler = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isAuthenticated } = require("../middleware/auth");

// create subscriber
router.post("/create-subscriber", async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return next(new ErrorHandler("Subscriber already exists", 400));
    }

    const newSubscriber = await Subscriber.create({
      email,
    });

    // Additional logic, such as sending a confirmation email, can be added here

    res.status(201).json({
      success: true,
      message: `Subscriber created successfully!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all subscribers
router.get(
  "/get-all-subscribers",
  isAuthenticated, // Add authentication middleware if needed
  catchAsyncErrors(async (req, res, next) => {
    try {
      const subscribers = await Subscriber.find();

      res.status(200).json({
        success: true,
        subscribers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get subscriber
router.get(
  "/get-subscriber",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const subscriber = await Subscriber.findById(req.subscriber.id);

      if (!subscriber) {
        return next(new ErrorHandler("Subscriber not found", 400));
      }

      res.status(200).json({
        success: true,
        subscriber,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete subscriber
router.delete(
  "/delete-subscriber",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const subscriberId = req.subscriber.id;

      await Subscriber.findByIdAndDelete(subscriberId);

      res.status(200).json({
        success: true,
        message: "Subscriber deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
