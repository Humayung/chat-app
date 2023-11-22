const socketIo = require('socket.io')
const jwt = require('jwt-then')
let socket

module.exports = {
	init: httpServer => {
		socket = socketIo(httpServer, {
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
