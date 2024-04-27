// Import necessary modules
const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import the CORS middleware
const fileUpload = require('express-fileupload'); // Agrega esta línea para importar express-fileupload
const MyApp = express(); // Create an Express application
require('dotenv').config(); // Load environment variables from a .env file

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


const port = process.env.SERVER_PORT || 5000;  // Set the server port from environment variable or default to 3000
// Start the server 
MyApp.listen(port, () => {
  console.log(`The API is listening at http://localhost:${port}`);
}); 