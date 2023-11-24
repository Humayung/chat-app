import mongoose from 'mongoose'

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

export default mongoose.model('Chatroom', chatRoomScema)
