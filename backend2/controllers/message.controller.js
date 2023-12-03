import repository from '../repository/repository.js'
import associatedChatroomController from '../controllers/associatedChatroom.controller.js'
import helper from '../utils/helper.js'
import messageSocket from '../messageSocket.js'

const getMessages = async (req, res) => {
	const {chatroomId} = req.query
	if (!chatroomId) throw 'Chatroom id is required'
	const messages = await repository.getAllMessages(chatroomId)
	res.json(messages)
}

const sendMessage = async (req, res) => {
	const {message, chatroomId} = req.body
	const {authorization} = req.headers
	if (!chatroomId) throw 'chatroom id is required'
	if (!message) throw 'message is required'
	if (!message && message.trim().length === 0) throw 'message cannot be empty'
	const decoded = await helper.decodeToken(authorization)
	const userId = decoded.id
	const newMessage = await repository.saveMessage(message, chatroomId, userId)
	const userChatrooms = await repository.getAssociatedChatroom(userId, chatroomId)
	if (!userChatrooms) {
		repository.saveAssociatedChatroom(userId, chatroomId)
	}
	messageSocket.emitNewMessage(chatroomId, newMessage)
	res.json({
		message: 'message sent',
		newMessage: newMessage
	})
}

const sendPrivateMessage = async (req, res) => {
	const {message, chatroomId} = req.body
	const {authorization} = req.headers
	if (!chatroomId) throw 'chatroom id is required'
	if (!message) throw 'message is required'
	if (message.trim().length === 0) throw 'message cannot be empty'
	const decoded = await helper.decodeToken(authorization)
	const userId = decoded.id
	const userChatrooms = await repository.getAssociatedChatrooms(userId)
	const canContinue = userChatrooms.find(item => item.isPrivate && item._id == chatroomId)
	if (!canContinue) throw `There is no private chatroom {${chatroomId}} found for this user`
	const newMessage = await repository.saveMessage(message, chatroomId, userId)
	messageSocket.emitNewMessage(chatroomId, newMessage)
	res.json({
		message: 'message sent',
		newMessage: newMessage
	})
}

export default {getMessages, sendMessage, sendPrivateMessage}
