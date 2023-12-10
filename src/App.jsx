import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import ContextProvider from './providers/ContextProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
])

function App() {

	return (
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	)
}

export default App
