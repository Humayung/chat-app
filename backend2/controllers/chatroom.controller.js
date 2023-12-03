import repository from '../repository/repository.js'
import expressAsyncHandler from 'express-async-handler'
import helper from '../utils/helper.js'

const createChatroom = expressAsyncHandler(async (req, res) => {
	const {name} = req.body
	const nameRegex = /^[A-Za-z\s]+/
	if (!nameRegex.test(name)) throw 'Chatroom name can only contains alphabetics'
	const chatroomExists = await repository.getChatroomByName(name)
	if (chatroomExists) throw 'Chatroom with that name is already exist'
	await repository.saveChatroom(name)
	res.json({
		message: 'Chatroom created'
	})
})

const createPrivateChatroom = async (req, res) => {
	const {otherUserId} = req.body
	const {authorization} = req.headers
	const decoded = await helper.decodeToken(authorization)
	const userId = decoded.id

	const user1 = await repository.getUserById(userId)
	const user2 = await repository.getUserById(otherUserId)

	if (!user1) throw `User {${userId}} not found`
	if (!user2) throw `User {${otherUserId}} not found`

	const user1Chatrooms = await repository.getAssociatedChatrooms(user1._id)
	const user2Chatrooms = await repository.getAssociatedChatrooms(user2._id)

	const sharedChatroom = user1Chatrooms.find(chatroom => {
		return user2Chatrooms.some(
			otherChatroom => otherChatroom.id === chatroom.id && chatroom.isPrivate
		)
	})

	if (sharedChatroom) {
		return res.json({
			created: false,
			chatroom: sharedChatroom
		})
	}

	const chatroom = await repository.saveChatroom('private', true)
	repository.saveAssociatedChatroom(user1._id, chatroom._id)
	repository.saveAssociatedChatroom(user2._id, chatroom._id)

	return res.json({
		created: true,
		chatroom: chatroom
	})
}

const getChatroom = expressAsyncHandler(async (req, res) => {
	const {chatroomId} = req.params
	const chatroom = await repository.getChatroomById(chatroomId)
	if (!chatroom) throw 'Chatroom not found'
	res.json(chatroom)
})

const getAllChatroom = expressAsyncHandler(async (req, res) => {
	const chatrooms = await repository.getAllChatrooms()
	res.json(chatrooms)
})

export default {createChatroom, getChatroom, getAllChatroom, createPrivateChatroom}
