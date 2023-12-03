import mongoose from 'mongoose'
import repository from '../repository/repository.js'
import jwt from 'jwt-then'
import helper from '../utils/helper.js'
const User = mongoose.model('User')

const register = async (req, res) => {
	const {name, email, password, username} = req.body
	const emailRegex = /@gmail.com|yahoo.com|hotmail.com|@live.com/
	const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;
	if (!emailRegex.test(email)) throw 'Email is not supported from your domain'
	if (!usernameRegex.test(username)) throw "Username only allowed contains: Alphanumeric characters (a-z, A-Z, 0-9), Underscore (_), Dot (.), Minimum length of 1 character, Maximum length of 30 characters" 
	if (password.length < 6) throw 'Password must be atleast 6 characters long'
	const userByEmailAndUsername = await repository.getUserByEmailOrUsername(email, username)
	if (userByEmailAndUsername) throw 'User with the same email or username is already exist'
	await repository.saveUser(name, email, username, helper.hash(password))
	res.json({
		message: `User [${name}] registered successfully`
	})
}

const searchByUsername = async (req, res) => {
	const {query} = req.query
	const users = await repository.searchUserByUsername(query)
	res.json(users)
}

const login = async (req, res) => {
	const {email, password} = req.body
	const user = await repository.getUserByEmailAndPassword(email, helper.hash(password))
	if (!user) throw 'Email and password did not match'
	const token = await helper.signCredentials(user.id)
	res.json({
		message: 'User logged in successfully',
		token
	})
}

export default {register, login, searchByUsername}
