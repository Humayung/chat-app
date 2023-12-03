import helper from '../utils/helper.js'
import repository from '../repository/repository.js'
import expressAsyncHandler from 'express-async-handler'

const getAssociatedChatrooms = expressAsyncHandler(async (req, res) => {
	const {authorization} = req.headers
	const decodedToken = await helper.decodeToken(authorization)
	const userId = decodedToken.id
	const chatrooms = await repository.getAssociatedChatrooms(userId)
	res.json(chatrooms)
})

const getAssociatedUsers = expressAsyncHandler(async (req, res) => {
	const {chatroomId} = req.params
	if (!chatroomId) throw 'Chatroom ID is required'
	const users = await repository.getAssociatedChatroomUsers(chatroomId)
	res.json(users)
})

export default {getAssociatedChatrooms, getAssociatedUsers}
