const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('cors')())

// bring in the routes
app.use('/user', require('./routes/user'))
app.use('/chatroom', require('./routes/chatroom'))
app.use('/message', require('./routes/message'))
app.use('/associatedRooms', require('./routes/associatedChatroom'))

// setup error handler
const errorHandlers = require('./handlers/error-handlers')
app.use(errorHandlers.notFound)
app.use(errorHandlers.mongooseErrors)
if (process.env.ENV === 'DEVELOPMENT') {
	app.use(errorHandlers.developmentErrors)
} else {
	app.use(errorHandlers.productionErrors)
}

module.exports = app
