import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import UserProvider from './providers/UserProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
])

function App() {

	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	)
}

export default App
