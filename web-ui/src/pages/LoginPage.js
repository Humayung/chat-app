import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import makeToast from '../Toaster'


const LoginPage = ({setupSocket}) => {
	const emailRef = React.createRef()
	const passwordRef = React.createRef()
	const navigate = useNavigate()

	const loginUser = () => {
		const email = emailRef.current.value
		const password = passwordRef.current.value
		axios
			.post('http://localhost:8000/user/login', {
				email,
				password
			})
			.then(response => {
				console.log(response.data)
				makeToast('success', response.data.message)
				localStorage.setItem('CHAT_TOKEN', response.data.token)
				navigate('/dashboard')
				setupSocket()
			})
			.catch(err => {
				console.log(err)
				makeToast('error', err.response.data.message)
			})
	}

	return (
		<div className='card'>
			<div className='cardHeader'>Login</div>
			<div className='cardBody'>
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
				<button onClick={loginUser}>Login</button>
			</div>
		</div>
	)
}
export default LoginPage
