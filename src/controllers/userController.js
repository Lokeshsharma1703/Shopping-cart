const Logger = require("../core/Logger");
const User = require("../models/User");
const userService = require("../services/userService");

const createUser = async (req, res) => {
  Logger.info("Entry in register user");
  const user = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };

  await userService.createUser(user, req.body.password);

  return res.redirect("/api/v1/users/login");
};

const login = (req, res) => {
  res.render("users/login");
};

const addToCart = async (req, res) => {
  Logger.info(`Entry in addToCart for productId : ${req.params.productId}`);
  const { productId } = req.params;
  const currentUser = req.user;
  await userService.addToCart(currentUser, productId);
  res.redirect(`/api/v1/products/${productId}`);
};

const getUserCart = async (req, res) => {
  const currentUser = req.user;
  const id = req.user._id;
  const totalAmount = currentUser.cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const user = await User.findById(id).populate("cart");
  res.render("users/cart", { cart: user.cart, totalAmount });
};

module.exports = {
  createUser,
  login,
  addToCart,
  getUserCart,
};
