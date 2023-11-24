import mongoose from 'mongoose'
const Message = mongoose.model('Message')
const AssociatedChatroom = mongoose.model('AssociatedChatroom')
import helper from '../utils/helper.js'
import messageSocket from '../messageSocket.js'

const getMessages = async (req, res) => {
	const {chatroomId} = req.query
	if (!chatroomId) throw 'Chatroom id is required'
	const messages = await Message.find({chatroom: chatroomId})
		.sort({createdAt: -1})
		.populate('user', 'name')
	res.json(messages)
}

const postMessage = async (req, res) => {
	const {message, chatroomId} = req.body
	const {authorization} = req.headers
	if (message.trim().length === 0) throw 'message cannot be empty'
	const socket = messageSocket.get()
	const decoded = await helper.decodeToken(authorization)
	const userId = decoded.id
	const newMessage = new Message({
		chatroom: chatroomId,
		user: userId,
		message: message
	})

	await newMessage.save()
	const pouplatedMessage = await newMessage.populate('user', 'name')

	const userChatrooms = await AssociatedChatroom.findOne({user: userId, chatroom: chatroomId})
	if (!userChatrooms) {
		const associatedChatroom = new AssociatedChatroom({
			chatroom: chatroomId,
			user: userId
		})
		await associatedChatroom.save()
	}
	socket.to(chatroomId).emit('newMessage', pouplatedMessage)
	res.json({
		message: 'message sent'
	})
}

export default {getMessages, postMessage}