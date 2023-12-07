import { useNavigate, useParams } from "react-router-dom"
import { useLoggedinUser } from "../providers/UserProvider"
import { leaveRoom, newChannelEntry } from "../utils/firebase"
import { nanoid } from "nanoid"
import { useChannelListener } from "../hooks/useChannelListener"

const Room = () => {
	const { roomId } = useParams()
	const { user } = useLoggedinUser()
	const navigate = useNavigate()
	const { offers } = useChannelListener(roomId)

	const handleSend = (e) => {
		e.preventDefault()
		const payload = {
			sender: user,
			type: 'offer/ice',
			payload: { success: true }
		}
		newChannelEntry(roomId, payload)
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
					<video className="webcam-feed" autoPlay playsInline></video>
					<button onClick={handleSend}>Send</button>
				</div>
				<div className="single-webcam-details">
					<p>Remote Stream</p>
					<video className="webcam-feed" autoPlay playsInline></video>
					<button onClick={() => {}}>Send</button>
				</div>
			</div>
			<div>
				{
					offers?.map(({ channelId }) => <p key={nanoid()}>{channelId}</p>)
				}
			</div>
		</div>

	)
}

export default Room
