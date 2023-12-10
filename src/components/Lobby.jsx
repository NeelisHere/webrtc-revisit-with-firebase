import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../providers/SocketProvider"
import { Box, Button, Input, Text } from "@chakra-ui/react"

const Lobby = () => {
    const roomRef = useRef(null)
    const navigate = useNavigate()
    const { socket, setMyId } = useSocket()

    useEffect(() => {
        socket.on('me', (socketId) => setMyId(socketId))
        return () => {
            socket.off('me')
        }
    }, [setMyId, socket])

    const handleEnterRoom = () => {
        const roomId = roomRef.current.value
        socket.emit('join-room', { roomId })
        navigate(`/room/${roomId}`)
    }
    return (
        <Box gap={5} w={'300px'} m={'0 auto'} border={'2px solid blue'} padding={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            <Text>Room:</Text>
            <Input variant={'filled'} ref={roomRef} type="number" />
            <Button colorScheme="teal" onClick={handleEnterRoom}>Enter Room</Button>
        </Box>
    )
}

export default Lobby
