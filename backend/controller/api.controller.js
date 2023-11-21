import db from '../database.js'
const apiController = {
	index: async (req, res) => {
		let collection = db.collection('user')
		collection
			.find({})
			.toArray()
			.then(results => {
				res.send(results).status(200)
			})
			.catch(err => {
				return res.status(500).json({
					message: err
				})
			})
	}
}
export default apiController
