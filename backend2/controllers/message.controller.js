const mongoose = require('mongoose')
const Message = mongoose.model('Message')

exports.getMessages = async (req, res) => {
	const {chatroomId} = req.query
	if (!chatroomId) throw 'Chatroom id is required'
	const messages = await Message.find({chatroom: chatroomId})
		.sort({createdAt: -1})
		.populate('user', 'name')
	res.json(messages)
}
