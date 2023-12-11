import { useNavigate } from "react-router-dom"
import { Box, Button } from "@chakra-ui/react"

const Lobby = () => {
    const navigate = useNavigate()

    const handleEnterRoom = () => {
        navigate(`/room`)
    }
    return (
        <Box gap={5} w={'300px'} m={'0 auto'} border={'2px solid blue'} padding={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            {/* <Text>Room:</Text> */}
            {/* <Input variant={'filled'} ref={roomRef} type="number" /> */}
            <Button colorScheme="teal" onClick={handleEnterRoom}>Enter Room</Button>
        </Box>
    )
}

export default Lobby
