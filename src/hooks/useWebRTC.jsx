import { useCallback, useEffect, useRef } from "react"
import WebRTC from "../utils/WebRTC"
import { newChannelEntry } from "../utils/firebase"
// import { ref } from "firebase/database"

const servers = {
    iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
    iceCandidatePoolSize: 10
}

export const useWebRTC = ({ roomId, userId, localWebcamRef, remoteWebcamRef }) => {
    const localStreamRef = useRef(null)
    const remoteSreamRef = useRef(null)
    const peerConnectionRef = useRef(null)

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
    
    const handleOffer = useCallback(async() => {
        const rtc = new WebRTC()
        try {
            const { sdp, type } = await rtc.createOffer(peerConnectionRef.current)
            // console.log(sdp, type)
            newChannelEntry(roomId, { sender: userId, type, sdp })
        } catch (error) {
            console.log(error)
        }
    }, [roomId, userId])

    useEffect(() => {
        peerConnectionRef.current = new RTCPeerConnection(servers)
        sendLocalStreams()
        receiveRemoteStreams()
        handleOffer()
    }, [handleOffer, receiveRemoteStreams, sendLocalStreams])

}

