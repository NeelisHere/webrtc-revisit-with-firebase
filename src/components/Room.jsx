import { useNavigate, useParams } from "react-router-dom"
import { useLoggedinUser } from "../providers/UserProvider"
import { leaveRoom } from "../utils/firebase"
import { nanoid } from "nanoid"
import { useChannelListener } from "../hooks/useChannelListener"
import { useRef } from "react"
import { useWebRTC } from "../hooks/useWebRTC"
// import WebRTC from "../utils/WebRTC"

const Room = () => {
	const { roomId } = useParams()
	const { user } = useLoggedinUser()
	const navigate = useNavigate()
	const { offers } = useChannelListener(roomId)
	const localWebcamRef = useRef(null)
    const remoteWebcamRef = useRef(null)
	useWebRTC({ roomId, userId: user, localWebcamRef, remoteWebcamRef })

	const handleSend = async (e) => {
		e.preventDefault()
	}
	const handleLeave = () => {
		leaveRoom(roomId, user)
		navigate('/')
	}

	return (
		<div>
			<div className="heading">
				<h1>User: {user}</h1>
				<h2>Room: {roomId}</h2>
				<button onClick={handleLeave}>Leave</button>
			</div>
			<div className="video-call-container">
				<div className="single-webcam-details">
					<p>Local Stream</p>
					<video ref={localWebcamRef} className="webcam-feed" autoPlay playsInline></video>
					<button onClick={handleSend}>Send</button>
				</div>
				<div className="single-webcam-details">
					<p>Remote Stream</p>
					<video ref={remoteWebcamRef} className="webcam-feed" autoPlay playsInline></video>
					<button onClick={() => { }}>Send</button>
				</div>
			</div>
			<div>
				{
					offers?.map(({ sdp }) => <p key={nanoid()}>{sdp}</p>)
				}
			</div>
		</div>

	)
}

export default Room
