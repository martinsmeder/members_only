const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display User sign up form on GET.
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  // Render the user sign up form
  res.render("signup-form");
});

// Handle User sign up on POST.
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  // Sanitize and validate user input using Express-validator
  await body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .run(req);

  await body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .run(req);

  await body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified.")
    .run(req);

  await body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long.")
    .run(req);

  await body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
    .withMessage("Passwords do not match.")
    .run(req);

  // Extract validation errors from request
  const errors = validationResult(req);

  // If there are errors, render the form again with error messages
  if (!errors.isEmpty()) {
    return res.render("signup-form", {
      title: "Sign Up",
      errors: errors.array(),
    });
  }

  // Create a new user instance with sanitized data
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password, // Password should be encrypted before saving to database
    is_admin: req.body.is_admin === "on", // Assuming checkbox value will be 'on' when checked
  });

  try {
    // Save the user to the database
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    // Handle database errors
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
