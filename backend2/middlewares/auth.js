import jwt from 'jwt-then'

const authenticate = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw 'Forbidden'
		const token = req.headers.authorization.split(' ')[1]
		const payload = await jwt.verify(token, process.env.SECRET)
		req.payload = payload
		next()
	} catch (err) {
		res.status(401).json({
			message: 'Forbidden'
		})
	}
}

export default authenticate
