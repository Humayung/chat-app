import config from './config.js'

import {MongoClient} from 'mongodb'
const connectionString = `mongodb://${config.database.host}:${config.database.port}`
const client = new MongoClient(connectionString)
let conn
try {
	conn = await client.connect()
	console.log(`Connected to ${connectionString}`)
} catch (e) {
	console.error(e)
}
let db = conn.db(config.database.name)
export default db
