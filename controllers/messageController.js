const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// Display all member messages on home page.
exports.message_list = asyncHandler(async (req, res, next) => {
  // Render the home page with all member messages
  res.send("NOT IMPLEMENTED: Message list");
});

// Display Message creation form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  // Render the message creation form
  res.send("NOT IMPLEMENTED: Message create GET");
});

// Handle Message creation on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
  // Process the form submission to create a new message
  res.send("NOT IMPLEMENTED: Message create POST");
});

// Handle Message deletion on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  // Process the form submission to delete a message
  res.send("NOT IMPLEMENTED: Message delete POST");
});
