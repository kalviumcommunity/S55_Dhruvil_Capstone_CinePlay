const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Router  = require('./routes.js');
var cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(Router)

// MongoDB connection 
const dbURI = process.env.DB_URI; 

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('📦 Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message); 
  }
};     

connectToDB();
// Get the default connection
const dbConnection = mongoose.connection;

// Event listener for connection error
dbConnection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
}); 

// Event listener for disconnection and reconnection
dbConnection.on('disconnected', () => { 
  console.log('❌ MongoDB disconnected');
});

dbConnection.on('reconnected', () => {
  console.log('📦 MongoDB reconnected'); 
});

// Defining the ping route with JSON response
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Home route to display database connection status
app.get('/', (req, res) => {
  const connectionStatus = dbConnection.readyState === 1 ? 'connected' : 'disconnected';
  res.send(`Database connection status: ${connectionStatus}`);
});

// Starting the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  }); 
}

module.exports = app;