const mongoose = require('mongoose')

const messageScema = new mongoose.Schema(
	{
		chatroom: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'Chatroom is required',
			ref: 'Chatroom'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'Chatroom is required',
			ref: 'User'
		},
		message: {
			type: String,
			required: 'Message is required'
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Message', messageScema)
