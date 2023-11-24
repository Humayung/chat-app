import mongoose from 'mongoose'
const User = mongoose.model('User')

import { sha256 } from 'js-sha256'
import jwt from 'jwt-then'

const register = async (req, res) => {
	const {name, email, password} = req.body
	const emailRegex = /@gmail.com|yahoo.com|hotmail.com|@live.com/
	if (!emailRegex.test(email)) throw 'Email is not supported from your domain'
	if (password.length < 6) throw 'Password must be atleast 6 characters long'

	const userCheck = await User.findOne({
		email
	})

	if (userCheck) throw 'User with the same email is already exist'

	const user = new User({name, email, password: sha256(password + process.env.SALT)})

	await user.save()

	res.json({
		message: `User [${name}] registered successfully`
	})
}

const login = async (req, res) => {
	const {email, password} = req.body
	const user = await User.findOne({
		email,
		password: sha256(password + process.env.SALT)
	})
	if (!user) throw 'Email and password did not match'
	const token = await jwt.sign({id: user.id}, process.env.SECRET)
	res.json({
		message: 'User logged in successfully',
		token
	})
}

export default {register, login}
