const mongoose = require('mongoose')

const chatRoomScema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name is required'
		},
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Chatroom', chatRoomScema)
