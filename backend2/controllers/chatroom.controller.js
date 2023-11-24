import mongoose from 'mongoose'
const Chatroom = mongoose.model('Chatroom')


const createChatroom = async (req, res) => {
	const {name} = req.body

	const nameRegex = /^[A-Za-z\s]+/

	if (!nameRegex.test(name)) throw 'Chatroom name can only contains alphabetics'

	const chatroomExists = await Chatroom.findOne({name})
	console.log(chatroomExists)
	if (chatroomExists) throw 'Chatroom with that name is already exist'
	const chatroom = new Chatroom({
		name
	})

	await chatroom.save()

	res.json({
		message: 'Chatroom created'
	})
}

const getChatroom = async (req, res) => {
	const {chatroomId} = req.params
	const chatroom = await Chatroom.findById(chatroomId)
	if (!chatroom) throw 'Chatroom not found'
	res.json(chatroom)
}

const getAllChatroom = async (req, res) => {
	const chatrooms = await Chatroom.find({})
	res.json(chatrooms)
}



export default {createChatroom, getChatroom, getAllChatroom}