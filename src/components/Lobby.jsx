import { useRef } from "react"
import { useLoggedinUser } from "../providers/UserProvider"
import { useNavigate } from "react-router-dom"
import { newRoomEntry } from '../utils/firebase'

const Lobby = () => {
    const roomRef = useRef(null)
    const userRef = useRef(null)
    const { setUser } = useLoggedinUser()
    const navigate = useNavigate()

    const handleEnterRoom = () => {
        const roomId = roomRef.current.value
        const userId = userRef.current.value
        // newChannelEntry(roomId, userId)
        newRoomEntry(roomId, userId)
        setUser(userId)
        navigate(`/room/${roomId}`)
    }

    return (
        <div>
            <label htmlFor="room-id">Room:</label>
            <input ref={roomRef} type="number" id="room-id" />

            <label htmlFor="user-id">User:</label>
            <input ref={userRef} type="number" id="user-id" />

            <button onClick={handleEnterRoom}>Enter Room</button>
        </div>
    )
}

export default Lobby
