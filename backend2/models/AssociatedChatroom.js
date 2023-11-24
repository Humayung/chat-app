import mongoose from "mongoose"

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

export default mongoose.model('AssociatedChatroom', associatedChatroomSchema)
