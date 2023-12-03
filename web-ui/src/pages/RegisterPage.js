import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import makeToast from '../Toaster'

const RegisterPage = props => {
	const nameRef = React.createRef()
	const emailRef = React.createRef()
	const passwordRef = React.createRef()
	const usernameRef = React.createRef()
	const navigate = useNavigate()

	const registerUser = () => {
		const name = nameRef.current.value
		const email = emailRef.current.value
		const username = usernameRef.current.value
		const password = passwordRef.current.value
		axios
			.post('http://localhost:8000/user/register', {
				name,
				email,
				password,
				username
			})
			.then(response => {
				console.log(response.data)
				makeToast('success', response.data.message)
				navigate('/login')
			})
			.catch(err => {
				console.log(err)
				makeToast('error', err.response.data.message)
			})
	}
	return (
		<div className='card'>
			<div className='cardHeader'>Registration</div>
			<div className='cardBody'>
				<div className='inputGroup'>
					<label htmlFor='name'>Name</label>
					<input type='name' name='name' id='name' placeholder='your name' ref={nameRef} />
				</div>
				<div className='inputGroup'>
					<label htmlFor='username'>Username</label>
					<input type='username' name='username' id='username' placeholder='your username' ref={usernameRef} />
				</div>
				<div className='inputGroup'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='abc@example.com'
						ref={emailRef}
					/>
				</div>
				<div className='inputGroup'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='your password'
						ref={passwordRef}
					/>
				</div>
				<button onClick={registerUser}>Register</button>
			</div>
		</div>
	)
}

export default RegisterPage
