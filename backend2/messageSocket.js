/* eslint-disable */
import {Server} from 'socket.io'
import jwt from 'jwt-then'
let socket

export default  {
	init: httpServer => {
		socket = new Server(httpServer, {
			cors: {
				origin: '*'
			}
		})
		socket.use(async (client, next) => {
			try {
				const token = client.handshake.query.token
				const payload = await jwt.verify(token, process.env.SECRET)
				client.userId = payload.id
				next()
			} catch (err) {
				console.log(err)
			}
		})
		socket.on('connection', client => {
			console.log(`Connected: ${client.userId}`)
			client.on('disconnect', () => {
				console.log(`Disconnected: ${client.userId}`)
			})
			client.on('joinRoom', async ({chatroomId}) => {
				client.join(chatroomId)
				console.log(`A user joined chatroom: ${chatroomId}`)
			})
			client.on('leaveRoom', ({chatroomId}) => {
				client.join(chatroomId)
				console.log(`A user left chatroom: ${chatroomId}`)
			})
		})
		return socket
	},
	get: () => {
		if (!socket) {
			throw 'Socket is not initialised'
		}
		return socket
	}
}
