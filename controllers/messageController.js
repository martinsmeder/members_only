const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// Display home page
exports.index = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve all messages
    const messages = await Message.find().populate("author");

    // Render the home page with all member messages
    res.render("index", { title: "All Messages", messages });
  } catch (err) {
    // Handle errors
    return next(err);
  }
});

// Display all member messages on home page.
exports.message_list = asyncHandler(async (req, res, next) => {
  // Render the home page with all member messages
  res.send("NOT IMPLEMENTED: Message list");
});

// Display Message creation form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  // Render the message creation form
  res.render("message-create-form", { title: "Create Message" });
});

// Handle Message creation on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
  // Extract content from the request body
  const { content } = req.body;

  // Create a new message instance
  const message = new Message({
    author: req.user._id, // Assuming req.user contains the authenticated user
    content: content,
  });

  try {
    // Save the message to the database
    await message.save();
    res.redirect("/"); // Redirect to home page or any other desired page
  } catch (err) {
    // Handle database errors
    return next(err);
  }
});

// Handle Message deletion on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const messageId = req.params.id;

    // Check if the user is an admin
    if (!req.user.is_admin) {
      res.status(403).send("Permission denied");
      return;
    }

    // Find the message by ID and delete it
    await Message.findByIdAndDelete(messageId);

    res.redirect("/"); // Redirect to home page or any other desired page after deletion
  } catch (error) {
    // Handle errors
    console.error("Error deleting message:", error);
    next(error);
  }
});
