import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import IndexPage from './pages/IndexPage'
import ChatroomPage from './pages/ChatroomPage'
import React from 'react'
import {io} from 'socket.io-client'
import makeToast from './Toaster'

function App() {
	const [socket, setSocket] = React.useState(null)
	const setupSocket = () => {
		const token = localStorage.getItem('CHAT_TOKEN')
		if (token && !socket) {
			const newSocket = io('http://localhost:8000', {
				query: {
					token: localStorage.getItem('CHAT_TOKEN')
				}
			})
			newSocket.on('disconnect', () => {
				setSocket(null)
				setTimeout(setupSocket, 3000)
				console.log('Socket disconnected')
				makeToast('error', 'Socket Disconnected')
			})

			newSocket.on('connect', () => {
				console.log('Socket connected')
				makeToast('success', 'Socket Connected')
			})
			setSocket(newSocket)
		}
	}

	React.useEffect(() => {
		setupSocket()
		// eslint-disable-next-line
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/login' element={<LoginPage setupSocket={setupSocket} />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/dashboard' element={<DashboardPage socket={socket} />} />
				<Route
					path='/chatroom/:id'
					element={<ChatroomPage socket={socket} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
