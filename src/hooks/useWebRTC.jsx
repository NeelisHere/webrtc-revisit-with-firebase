import { useCallback, useEffect, useRef } from "react"
import { answerListener, answersEntry, offerListener, offersEntry } from "../utils/firebase"

const servers = {
    iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
    iceCandidatePoolSize: 10
}

export const useWebRTC = ({ roomId, userId, localWebcamRef, remoteWebcamRef }) => {
    const localStreamRef = useRef(null)
    const remoteSreamRef = useRef(null)
    const peerConnectionRef = useRef(null)
    // const { offers } = useChannelListener(roomId)

    const sendLocalStreams = useCallback(async() => {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({ 
            video: true, audio: true 
        })
        localStreamRef.current.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, localStreamRef.current)
        });
        localWebcamRef.current.srcObject = localStreamRef.current
        localWebcamRef.current.muted = true
    }, [localWebcamRef])

    const receiveRemoteStreams = useCallback(async() => {
        peerConnectionRef.current.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteSreamRef.current.addTrack(track)
            })
        }
        remoteWebcamRef.current.srcObject = remoteSreamRef.current
    }, [remoteWebcamRef])
    
    const handleConnection = useCallback(async() => {
        try {
            const offer = await peerConnectionRef.current.createOffer()
            await peerConnectionRef.current.setLocalDescription(offer);
            console.log(offer)
            offerListener(roomId, peerConnectionRef.current)
            offersEntry(roomId, { sender: userId, offer })

            const answer = await peerConnectionRef.current.createAnswer()
            await peerConnectionRef.current.setLocalDescription(answer);
            console.log(answer)
            answerListener(roomId, peerConnectionRef.current)
            answersEntry(roomId, { sender: userId, answer })

        } catch (error) {
            console.log(error)
        }
    }, [roomId, userId])

    useEffect(() => {
        peerConnectionRef.current = new RTCPeerConnection(servers)
    }, [])

    useEffect(() => {
        sendLocalStreams()
    }, [sendLocalStreams])

    useEffect(() => {
        receiveRemoteStreams()
    }, [receiveRemoteStreams])

    useEffect(() => {
        handleConnection()
    }, [handleConnection])

}

