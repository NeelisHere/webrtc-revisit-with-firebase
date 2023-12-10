import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home'
import Lobby from './components/Lobby'
import Room from './components/Room'
// import ContextProvider from './providers/ContextProvider'
import SocketProvider from './providers/SocketProvider'

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
		path: '/room/:roomId',
		element: <Room />
	},
])

function App() {

	return (
		// <ContextProvider>
		// 	<RouterProvider router={router} />
		// </ContextProvider>
		<SocketProvider>
			<RouterProvider router={router} />
		</SocketProvider>
	)
}

export default App
