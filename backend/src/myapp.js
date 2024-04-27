// Import necessary modules
const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import the CORS middleware
const fileUpload = require('express-fileupload'); // Import the express-fileupload middleware
require('dotenv').config(); // Load environment variables from a .env file

// Create an Express application
const MyApp = express(); 

//middlewares
const bodyParser = require('body-parser'); 
MyApp.use(bodyParser.json({ limit: '15mb' }));

MyApp.use(express.urlencoded({ extended: true }));
MyApp.use(fileUpload());


MyApp.use(express.json());  // Parse JSON request bodies
MyApp.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Routes
const Router = require('./routes/routes'); // Import the route definitions
// Define routes
MyApp.use(Router);

// Export the Express application for testing
module.exports = MyApp;