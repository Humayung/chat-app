import jwt from 'jwt-then'
import {sha256} from 'js-sha256'

const decodeToken = async authorization => {
	const token = authorization.split(' ')[1]
	const decoded = await jwt.verify(token, process.env.SECRET)
	return decoded
}

const verifyToken = async token => {
	return await jwt.verify(token, process.env.SECRET)
}

const signCredentials = async userId => {
	return await jwt.sign({id: userId}, process.env.SECRET)
}

const hash = value => {
	return sha256(value + process.env.SALT)
}

const validateNullFields = (body, fields) => {
	fields.forEach(element => {
		if (body[element] === undefined) throw `Field ${element} is required`
	})
}
export default {
	decodeToken,
	signCredentials,
	hash,
	verifyToken,
	validateNullFields
}
