import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection ERROR: ${err.message}`);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!');
});

// bring in the models
import './models/User.js';
import './models/Chatroom.js';
import './models/Message.js';
import './models/AssociatedChatroom.js';

import app from './app.js';

const server = app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

import messagingSocket from './messageSocket.js';
messagingSocket.init(server);