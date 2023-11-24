import jwt from 'jwt-then'

export default {
	decodeToken: async authorization => {
		const token = authorization.split(' ')[1]
		const decoded = await jwt.verify(token, process.env.SECRET)
      return decoded
	}
}
