const express = require("express");

const router = express.Router();
const productController = require("../../controllers/productController");
const catchAsync = require("../../core/catchAsync");
const { isAdminOrSeller, isProductAuthor } = require("../../middleware/auth");

// Get all products
router.get("/", catchAsync(productController.getAllProducts));

// Get new form for creating products
router.get("/new", isAdminOrSeller, productController.showNewForm);

// Create new product
router.post("/", isAdminOrSeller, catchAsync(productController.create));

// Show a product details
router.get("/:id", catchAsync(productController.findById));

// Get edit form
router.get("/:id/edit", isAdminOrSeller, productController.showEditForm);

// Update a product
router.patch("/:id", isAdminOrSeller, productController.updateProduct);

// Delete a product
router.delete(
  "/:id",
  isProductAuthor,
  catchAsync(productController.deleteProduct)
);

module.exports = router;
