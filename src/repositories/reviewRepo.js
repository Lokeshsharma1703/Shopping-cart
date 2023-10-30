const Review = require("../models/Review");

const save = (review) => {
  const newReview = new Review(review);
  return newReview.save();
};

const findById = (id) => Review.findById(id);

const deleteReview = (id) => Review.findByIdAndDelete(id);

module.exports = {
  save,
  findById,
  deleteReview,
};
