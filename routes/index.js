const express = require("express");
const router = express.Router();

// Require controllers
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// ======================= MESSAGE ROUTES ========================= //

/* GET home page. */
router.get("/", message_controller.index);

// GET request for list of all messages.
router.get("/messages", message_controller.message_list);

// GET request for creating a message
router.get("/message/create", message_controller.message_create_get);

// POST request for creating a message
router.post("/message/create", message_controller.message_create_post);

// POST request for deleting a message (admin only)
router.post("/message/:id/delete", message_controller.message_delete_post);

// ========================= USER ROUTES ========================== //

// GET request for signup.
router.get("/signup", user_controller.user_signup_get);

// POST request for signup.
router.post("/signup", user_controller.user_signup_post);

// GET request for login.
router.get("/login", user_controller.user_login_get);

// POST request for login.
router.post("/login", user_controller.user_login_post);

// GET request for logging out.
router.get("/logout", user_controller.user_logout_get);

// GET request for joining club.
router.get("/join", user_controller.join_club_get);

// POST request for joining club.
router.post("/join", user_controller.join_club_post);

module.exports = router;
