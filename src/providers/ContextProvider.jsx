import { createContext, useCallback, useRef, useState, useEffect } from "react"
import { io } from "socket.io-client"
import Peer from 'simple-peer'

export const SocketContext = createContext(null)
const API_URL = 'http://localhost:8000'

const socket = io(API_URL)

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState()
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    const myVideo = useRef()
    const userVideo = useRef(null)
    const connectionRef = useRef(null)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        }).then((currentStream) => {
            setStream(currentStream)
            if (myVideo.current) {
                myVideo.current.srcObject = currentStream
            }
        })
        socket.on('me', (id) => {
            console.log(`my-socket-id: ${id}`)
            setMe(id)
        })
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        })
    }, [])

    const answerCall = useCallback(() => {
        setCallAccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }, [call.from, call.signal, stream])

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: me,
                name
            })
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    const value = {
        call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall, socket, setStream, setCall, setMe
    }
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export default ContextProvider
