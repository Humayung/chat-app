import axios from 'axios'
import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const ChatroomPage = ({socket}) => {
	console.log(socket, 'coba ')
	const params = useParams()
	const [messages, setMessages] = React.useState([])
	const [chatroom, setChatroom] = React.useState([])
	const [userId, setUserId] = React.useState('')
	const messageRef = React.useRef()
	const navigate = useNavigate()
	const chatroomId = params.id
	const sendMessage = () => {
		if (socket) {
			console.log(`sent: ${messageRef.current.value}`)
			socket.emit('chatroomMessage', {
				chatroomId: chatroomId,
				message: messageRef.current.value
			})
			messageRef.current.value = ''
		}
	}

	const getChatroom = () => {
		axios
			.get(`http://localhost:8000/chatroom/${chatroomId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
				}
			})
			.then(response => {
				setChatroom(response.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const getMessages = () => {
		axios
			.get('http://localhost:8000/message', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
				},
				params: {
					chatroomId: chatroomId
				}
			})
			.then(response => {
				setMessages(response.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	React.useEffect(() => {
		if (socket) {
			const token = localStorage.getItem('CHAT_TOKEN')
			if (token) {
				const payload = JSON.parse(atob(token.split('.')[1]))
				setUserId(payload.id)
			}
			if (socket) {
				socket.on('newMessage', message => {
					console.log(message)
					setMessages([message, ...messages])
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages])

	React.useEffect(() => {
		getChatroom()
		if (socket) {
			getMessages()
			socket.emit('joinRoom', {
				chatroomId
			})
			return () => {
				if (socket) {
					// Component unmount
					socket.emit('leaveRoom', {
						chatroomId: params.id
					})
				}
			}
		} else{
      navigate("/dashboard")
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className='chatroomPage'>
			<div className='chatroomSection'>
				<div className='cardHeader'>{chatroom.name}</div>
				<div className='chatroomContent'>
					{messages.map((message, index) => (
						<div key={index} className='message'>
							<span className={userId === message.user._id ? 'ownMessage' : 'otherMessage'}>
								{message.user.name}
								{': '}
							</span>
							{message.message}
						</div>
					))}
				</div>
				<div className='chatroomActions'>
					<div>
						<input
							type='text'
							className='text'
							name='message'
							placeholder='type your message'
							ref={messageRef}
						/>
					</div>
					<button className='join' onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChatroomPage
