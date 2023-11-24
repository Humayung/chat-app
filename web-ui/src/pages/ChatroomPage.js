import axios from 'axios'
import React from 'react'
import {useParams} from 'react-router-dom'
import moment from 'moment'
import makeToast from '../Toaster'

const ChatroomPage = ({socket}) => {
	const params = useParams()
	const [messages, setMessages] = React.useState([])
	const [chatroom, setChatroom] = React.useState([])
	const [userId, setUserId] = React.useState('')
	const messageRef = React.useRef()
	const chatroomId = params.id
	const sendMessage = () => {
		const data = {
			chatroomId: chatroomId,
			message: messageRef.current.value
		}
		axios
			.post(`http://localhost:8000/message`, data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
				}
			})
			.then(() => {
				messageRef.current.value = ''
			})
			.catch(err => {
				makeToast('error', err.response.data.message)
			})
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
				console.log(response.data)
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
					setMessages([message, ...messages])
					console.log(message.user._id, userId, message.message, message.user._id !== userId)
					if (userId.length > 0 && message.user._id !== userId) {
						makeToast('info', `New message from ${message.user.name}: ${message.message}`)
					}
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages])

	React.useEffect(() => {
		getChatroom()
		getMessages()
		console.log('socket', socket)
		if (socket) {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])
	return (
		<div className='chatroomPage'>
			<div className='chatroomSection'>
				<div className='cardHeader'>{chatroom.name}</div>
				<div className='chatroomContent'>
					{messages.map((message, index) => (
						<div>
							{dateHeader(message, messages[index - 1])}
							<div key={index} className='message'>
								<span className={userId === message.user._id ? 'ownMessage' : 'otherMessage'}>
									{message.user.name}
									{': '}
								</span>
								{message.message}
							</div>
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

const dateHeader = (curr, prev) => {
	if (!curr || !prev) return <div></div>
	const currDay = moment(curr.createdAt).format('ddd')
	const prevDay = moment(prev.createdAt).format('ddd')
	if (currDay !== prevDay) {
		return <div>{currDay}</div>
	} else {
		return <div></div>
	}
}
export default ChatroomPage
