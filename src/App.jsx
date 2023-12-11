import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home'
import Lobby from './components/Lobby'
import Room from './components/Room'
// import ContextProvider from './providers/ContextProvider'
// import SocketProvider from './providers/SocketProvider'
import PeerProvider from './providers/PeerProvider'

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <Home />
// 	},
// ])

const router = createBrowserRouter([
	{
		path: '/',
		element: <Lobby />
	},
	{
		path: '/room',
		element: <Room />
	},
])

function App() {

	return (
		<PeerProvider>
			<RouterProvider router={router} />
		</PeerProvider>
	)
}

export default App
