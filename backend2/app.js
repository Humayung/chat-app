import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import chatroomRoutes from './routes/chatroom.js';
import messageRoutes from './routes/message.js';
import associatedChatroomRoutes from './routes/associatedChatroom.js';
import * as errorHandlers from './handlers/error-handlers.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// bring in the routes
app.use('/user', userRoutes);
app.use('/chatroom', chatroomRoutes);
app.use('/message', messageRoutes);
app.use('/associatedRooms', associatedChatroomRoutes);

// setup error handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === 'DEVELOPMENT') {
	app.use(errorHandlers.developmentErrors);
} else {
	app.use(errorHandlers.productionErrors);
}

export default app;