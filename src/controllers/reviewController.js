const User = require("../models/User");
const reviewRepo = require("../repositories/reviewRepo");
const reviewService = require("../services/reviewService");
const Logger = require("../core/Logger");
const Product = require("../models/Product");

const create = async (req, res) => {
  const { id: productId } = req.params;

  const user = await User.findById(req.user);

  const review = {
    rating: req.body.rating,
    comment: req.body.comment,
    authorname: user.username,
    author: user,
  };

  console.log(user.username);

  await reviewService.create(productId, review);
  req.flash("success", "Added your review successfully");
  res.redirect(`/api/v1/products/${productId}`);
};

const deleteProductReview = async (req, res) => {
  Logger.info("Entry in delete review");
  const { productid, id } = req.params;

  const product = await Product.findById(productid);
  const newReview = product.reviews.filter((pid) => pid._id !== id);

  product.reviews = newReview;
  product.save();

  await reviewRepo.deleteReview(id);

  req.flash("success", "review deleted successfully");
  res.redirect(`/api/v1/products/${productid}`);
};

module.exports = {
  create,
  deleteProductReview,
};
