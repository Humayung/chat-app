import mongoose from 'mongoose'
import helper from '../utils/helper.js'
const AssociatedChatroom = mongoose.model('AssociatedChatroom')

const getAssociatedChatrooms = async (req, res) => {
	const {authorization} = req.headers
	const decodedToken = await helper.decodeToken(authorization)
	const userId = decodedToken.id
	try {
		const chatrooms = await AssociatedChatroom.find({user: userId}).populate('chatroom', 'name')
		res.json(chatrooms)
	} catch (err) {
		throw err.message
	}
}

const getAssociatedUsers = async (req, res) => {
	const {chatroomId} = req.params
	if (!chatroomId) throw 'Chatroom ID is required'
	try {
		const users = await AssociatedChatroom.find({chatroom: chatroomId}).populate('user', 'name')
		res.json(users)
	} catch (err) {
		throw err.message
	}
}

export default {getAssociatedChatrooms, getAssociatedUsers}
