import { useNavigate } from "react-router-dom"
import { Box, Button, Input, Text } from "@chakra-ui/react"
import { usePeer } from "../providers/PeerProvider"


const Room = () => {
	const navigate = useNavigate()
	const { myPeerId, remotePeerId, setRemotePeerId, remoteWebcamRef, myWebcamRef, peerInstance } = usePeer()
	const handleLeave = () => navigate('/')
	const handleCall = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
			remoteWebcamRef.current.srcObject = stream;
			remoteWebcamRef.current.play();

			const call = peerInstance.current.call(remotePeerId, stream)

			call.on('stream', (remoteStream) => {
				remoteWebcamRef.current.srcObject = remoteStream
				remoteWebcamRef.current.play();
			});
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Box w={'700px'} m={'0 auto'}>
			<Box gap={3} border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
				<Text fontSize={'2xl'} fontWeight={"bold"}>User: {myPeerId}</Text>
				{/* <Text fontSize={'xl'} fontWeight="bold">Room: {roomId}</Text> */}
				<Button colorScheme="red" onClick={handleLeave}>Leave</Button>
			</Box>
			<Box border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
				<Box border={'2px solid blue'} padding={'10px'} m={'10px'} w={'50%'}>
					<Text>Local Stream</Text>
					<video ref={myWebcamRef} className="webcam-feed" autoPlay playsInline></video>
				</Box>
				<Box gap={4} border={'2px solid blue'} padding={'10px'} m={'10px'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
					<Text>Whom to call?</Text>
					<Input value={remotePeerId} onChange={(e) => setRemotePeerId(e.target.value)} variant={'filled'} placeholder="Enter user-id to be called" />
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
