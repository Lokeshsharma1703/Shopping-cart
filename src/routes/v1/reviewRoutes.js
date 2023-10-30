const express = require("express");
const reviewController = require("../../controllers/reviewController");
const { isReviewAuthor } = require("../../middleware/auth");

const router = express.Router();

router.post("/:id/reviews", reviewController.create);

router.delete(
  "/:productid/review/:id",
  isReviewAuthor,
  reviewController.deleteProductReview
);

module.exports = router;
