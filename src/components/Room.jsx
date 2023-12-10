import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSocket } from "../providers/SocketProvider"
import { Box, Button, Input, Text } from "@chakra-ui/react"

const Room = () => {
	const { roomId } = useParams()
	const navigate = useNavigate()
	const { myId } = useSocket()
	const [localStream, setLocalStream] = useState(null)
	const [remoteStream, setRemoteStream] = useState(null)
	const localWebcamRef = useRef(null)
	const remoteWebcamRef = useRef(null)

	const captureLocalStream = useCallback(async() => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true, audio: false,
			})
			setLocalStream(stream)
			localWebcamRef.current.srcObject = stream
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		captureLocalStream()
	}, [captureLocalStream])

	const handleLeave = () => {
		navigate('/')
	}

	const handleCall = () => {

	}

	return (
		<Box w={'700px'} m={'0 auto'}>
			<Box gap={3} border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
				<Text fontSize={'2xl'} fontWeight={"bold"}>User: {myId}</Text>
				<Text fontSize={'xl'} fontWeight="bold">Room: {roomId}</Text>
				<Button colorScheme="red" onClick={handleLeave}>Leave</Button>
			</Box>
			<Box border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
				<Box border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
					<Text>Local Stream</Text>
					<video ref={localWebcamRef} className="webcam-feed" autoPlay playsInline></video>
				</Box>
				<Box gap={4} border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
					<Text>Whom to call?</Text>
					<Input variant={'filled'} placeholder="Enter user-id to be called" />
					<Button onClick={handleCall}>Call</Button>
				</Box>
			</Box>
			<Box>
				<Box border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
					<Text>Remote Stream</Text>
					<video ref={remoteWebcamRef} className="webcam-feed" autoPlay playsInline></video>
					<Button onClick={() => { }}>Send</Button>
				</Box>
			</Box>
		</Box>

	)
}

export default Room
