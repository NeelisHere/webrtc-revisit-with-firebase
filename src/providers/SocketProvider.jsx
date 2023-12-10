import { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const [myId, setMyId] = useState(null)
    const socket = useMemo(() => {
        const { VITE_API_URL: apiURL } = import.meta.env
        return io(apiURL)
    }, [])

    return (
        <SocketContext.Provider value={{ socket, myId, setMyId }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider
