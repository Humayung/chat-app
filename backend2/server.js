require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)

mongoose.connection.on('error', err => {
	console.log('Mongoose connection ERROR: ' + err.message)
})

mongoose.connection.once('open', () => {
	console.log('MongoDB connected!')
})

// bring in the models

require('./models/User')
require('./models/Chatroom')
require('./models/Message')
require('./models/AssociatedChatroom')

const app = require('./app')

const server = app.listen(8000, () => {
	console.log('Server listening on port 8000')
})

require('./messageSocket').init(server)

