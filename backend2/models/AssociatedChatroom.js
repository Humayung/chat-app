const mongoose = require('mongoose')

const associatedChatroomSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User is required',
			ref: "User"
		},
		chatroom: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User is required',
			ref: "Chatroom"
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('AssociatedChatroom', associatedChatroomSchema)
