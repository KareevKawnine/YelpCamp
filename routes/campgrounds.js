const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utilities/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Campground = require("../models/campground");
const { route } = require("./users");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.get("/:id", catchAsync(campgrounds.showCampground));
router.put(
  "/:id",
  isAuthor,
  isLoggedIn,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.get(
  "/:id/edit",
  isAuthor,
  isLoggedIn,
  catchAsync(campgrounds.renderEditForm)
);

router.delete(
  "/:id",
  isAuthor,
  isLoggedIn,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
