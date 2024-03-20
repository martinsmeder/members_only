#! /usr/bin/env node
// "Shebang" to ensure that the script will be interpreted using the Node.js interpreter
// Run the script: node populatedb <your MongoDB connection string>

// Get and store command-line arguments passed to the script, excluding the first
// two elements (Node.js executable and script path)
const userArgs = process.argv.slice(2);

// Get models
const User = require("./models/user");
const Message = require("./models/message");

// Import the Mongoose library
const mongoose = require("mongoose");

// Disable strict mode to allow for more flexible queries
mongoose.set("strictQuery", false);

// Retrieve the MongoDB connection string from command-line arguments
const mongoDB = userArgs[0];

// Define the main function
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB); // Connect to database using connection string
  console.log("Debug: Should be connected?");
  const createdUsers = await createUsers(); // Create users
  await createMessages(createdUsers); // Create messages
  console.log("Debug: Closing mongoose");
  mongoose.connection.close(); // Close the connection
}

// Define functions to create users and messages
async function userCreate(
  first_name,
  last_name,
  username,
  password,
  membership_status,
  is_admin
) {
  const newUser = new User({
    first_name,
    last_name,
    username,
    password,
    membership_status,
    is_admin,
  });
  await newUser.save(); // Insert new document
  console.log(`Added user: ${username}`);
  return newUser;
}

async function messageCreate(author, content) {
  const newMessage = new Message({
    author,
    content,
  });
  await newMessage.save(); // Insert new document
  console.log(`Added message: ${content}`);
  return newMessage;
}

// Call functions to create users and messages
async function createUsers() {
  const createdUsers = await Promise.all([
    userCreate("John", "Doe", "john_doe", "password123", "approved", true),
    userCreate("Jane", "Smith", "jane_smith", "password456", "approved", false),
  ]);
  return createdUsers;
}

async function createMessages(users) {
  const createdMessages = await Promise.all([
    messageCreate(users[0]._id, "Hello, world!"),
    messageCreate(users[1]._id, "This is a test message."),
  ]);
  return createdMessages;
}

// Start the main function
main().catch((err) => console.log(err));
