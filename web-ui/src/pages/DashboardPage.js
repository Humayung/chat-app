import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import makeToast from '../Toaster'

const DashboardPage = () => {
	const [chatrooms, setChatrooms] = React.useState([])
	const chatroomNameRef = React.useRef()

	const getChatrooms = () => {
		axios
			.get('http://localhost:8000/chatroom', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
				}
			})
			.then(response => {
				console.log(response)
				setChatrooms(response.data)
			})
			.catch(err => {
				console.log(err)
				setTimeout(getChatrooms, 3000)
			})
	}

	const createChatroom = () => {
		const data = {
			name: chatroomNameRef.current.value
		}
		axios
			.post('http://localhost:8000/chatroom', data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
				}
			})
			.then(response => {
				console.log(response)
				makeToast('success', response.data.message)
				chatroomNameRef.current.value = ""
				getChatrooms()
			})
			.catch(err => {
				console.log(err)
				makeToast('error', err.response.data.message)
			})
	}

	React.useEffect(() => {
		getChatrooms()
		// eslint-disable-next-line
	}, [])
	return (
		<div className='card'>
			<div className='cardHeader'>Chatrooms</div>
			<div className='cardBody'>
				<div className='inputGroup'>
					<label htmlFor='chatroomName'>Chatroom Name</label>
					<input
						type='chatroomName'
						name='chatroomName'
						id='chatroomName'
						placeholder='type here'
						ref={chatroomNameRef}
					/>
				</div>
				<button onClick={createChatroom}>Create Chatroom</button>
				<div className='chatrooms'>
					{chatrooms.map(chatroom => (
						<div key={chatroom._id} className='chatroom'>
							<div>{chatroom.name}</div>
							<Link to={`/chatroom/${chatroom._id}`}>
								<div className='join'>Join</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
