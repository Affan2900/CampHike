const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campground");
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground));
    

router.get("/New", isLoggedIn, campgrounds.newForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.destroyCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
