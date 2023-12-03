import jwt from 'jwt-then'
import helper from '../utils/helper.js'

const authenticate = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw 'Forbidden'
		const token = req.headers.authorization.split(' ')[1]
		req.payload = await helper.verifyToken(token)
		next()
	} catch (err) {
		res.status(401).json({
			message: 'Forbidden'
		})
	}
}

export default authenticate
