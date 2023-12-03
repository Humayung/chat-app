import mongoose from 'mongoose'
const Message = mongoose.model('Message')
const AssociatedChatroom = mongoose.model('AssociatedChatroom')
const Chatroom = mongoose.model('Chatroom')
const User = mongoose.model('User')

const saveMessage = async (message, chatroomId, userId) => {
	const newMessage = new Message({
		chatroom: chatroomId,
		user: userId,
		message: message
	})

	await newMessage.save()
	return await newMessage.populate('user', 'name')
}

const getAllMessages = async chatroomId => {
	return await Message.find({chatroom: chatroomId}).sort({createdAt: -1}).populate('user', 'name')
}

const getChatroomByName = async name => {
	return await Chatroom.findOne({name})
}

const getChatroomById = async id => {
	return await Chatroom.findById(id)
}

const saveAssociatedChatroom = async (userId, chatroomId) => {
	const associatedChatroom = new AssociatedChatroom({
		chatroom: chatroomId,
		user: userId
	})
	return await associatedChatroom.save()
}

const saveChatroom = async (name, isPrivate = false) => {
	const chatroom = new Chatroom({
		name,
		isPrivate
	})
	await chatroom.save()
	return chatroom
}

const saveUser = async (name, email, username, hashedPassword) => {
	const user = new User({name, email, username, password: hashedPassword})
	return await user.save()
}

const getAllChatrooms = async (includePrivate = false) => {
	const query = includePrivate ? {} : {isPrivate: false}
	return await Chatroom.find(query)
}

const getUserByEmail = async email => {
	return await User.findOne({
		email
	})
}

const searchUserByUsername = async username => {
	return await User.find(
		{username: {$regex: '.*' + username + '.*', $options: 'i'}},
		{username: 1, name: 1}
	).limit(10)
}

const getUserByEmailOrUsername = async (email, username) => {
	return await User.findOne({
		$or: [{email}, {username}]
	})
}

const getUserById = async userId => {
	return await User.findById(userId)
}

const getUserByEmailAndPassword = async (email, hashedPassword) => {
	return await User.findOne({
		email,
		password: hashedPassword
	})
}

const getAssociatedChatroom = async (userId, chatroomId) => {
	return await AssociatedChatroom.findOne({user: userId, chatroom: chatroomId})
}

const getAssociatedChatrooms = async userId => {
	return (
		await AssociatedChatroom.find({user: userId}).populate({
			path: 'chatroom',
			select: ['isPrivate', 'name']
		})
	).map(entry => entry.chatroom)
}

const getAssociatedChatroomUsers = async chatroomId => {
	return (await AssociatedChatroom.find({chatroom: chatroomId}).populate('user', 'name')).map(
		entry => entry.user
	)
}

export default {
	saveMessage,
	getAllMessages,
	saveAssociatedChatroom,
	getChatroomByName,
	saveChatroom,
	getChatroomById,
	getAllChatrooms,
	saveUser,
	getUserById,
	getUserByEmailOrUsername,
	getUserByEmail,
	getUserByEmailAndPassword,
	getAssociatedChatrooms,
	getAssociatedChatroomUsers,
	getAssociatedChatroom,
	searchUserByUsername
}
