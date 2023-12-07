import Room from './components/Room'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Lobby from './components/Lobby'
import UserProvider from './providers/UserProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Lobby />
	},
	{
		path: `/room/:roomId`,
		element: <Room />
	}
])

function App() {

	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	)
}

export default App
