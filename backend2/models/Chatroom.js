import mongoose from 'mongoose'

const chatRoomScema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name is required'
		},
		isPrivate: {
			type: Boolean,
			default: false 
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Chatroom', chatRoomScema)
