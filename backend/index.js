import db from "./database.js";
import express from 'express'
import bodyParser from 'body-parser'
import config from './config.js'
import routes from './routes.js'

const app = express()
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

app.use('/', routes)
app.listen(config.port, () => {
	console.log('Server is running on port ' + config.port)
	console.log('Visit http://localhost:' + config.port + '/')
})


