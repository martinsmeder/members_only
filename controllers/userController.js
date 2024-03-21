const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display User sign up form on GET.
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  // Render the user sign up form
  res.render("signup-form");
});

// Handle User sign up on POST.
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  // Process the form submission to sign up a new user
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

// Display User login form on GET.
exports.user_login_get = asyncHandler(async (req, res, next) => {
  // Render the user login form
  res.send("NOT IMPLEMENTED: User login GET");
});

// Handle User login on POST.
exports.user_login_post = asyncHandler(async (req, res, next) => {
  // Process the form submission to log in a user
  res.send("NOT IMPLEMENTED: User login POST");
});

// Display join club page on GET.
exports.join_club_get = asyncHandler(async (req, res, next) => {
  // Render the join club page
  res.send("NOT IMPLEMENTED: Join club GET");
});

// Handle join club on POST.
exports.join_club_post = asyncHandler(async (req, res, next) => {
  // Process the form submission to join the club
  res.send("NOT IMPLEMENTED: Join club POST");
});
