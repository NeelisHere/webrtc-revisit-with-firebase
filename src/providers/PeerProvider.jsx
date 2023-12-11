import Peer from "peerjs";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const PeerContext = createContext(null)

export const usePeer = () => useContext(PeerContext)

const PeerProvider = ({ children }) => {
    const [myPeerId, setMyPeerId] = useState(null)
    const [remotePeerId, setRemotePeerId] = useState(null)
    const myWebcamRef = useRef(null)
    const remoteWebcamRef = useRef(null)
    const peerInstance = useRef(null)

    const handleMyWebcam = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            if (myWebcamRef && myWebcamRef.current) {
                myWebcamRef.current.srcObject = stream
                myWebcamRef.current.play()
            }
        } catch (error) {
            console.log(error)
        }
    }, [myWebcamRef])

    useEffect(() => {
        handleMyWebcam()
    }, [handleMyWebcam, myWebcamRef])


    const initializePeer = useCallback(() => {
        const peer = new Peer()
        peer.on('open', (id) => {
            setMyPeerId(id)
        })
        peer.on('call', async (call) => {
            console.log(call)
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                myWebcamRef.current.srcObject = stream
                myWebcamRef.current.play()
                call.answer(stream)
                call.on('stream', (remoteStream) => {
                    remoteWebcamRef.current.srcObject = remoteStream
                    remoteWebcamRef.current.play();
                });
            } catch (error) {
                console.log(error)
            }
        })
        peerInstance.current = peer
    }, [])

    useEffect(() => {
        initializePeer()
    }, [initializePeer])

    const value = {
        myPeerId, setMyPeerId, remotePeerId, setRemotePeerId,
        peerInstance, remoteWebcamRef, myWebcamRef
    }

    return (
        <PeerContext.Provider value={value}>
            { children }
        </PeerContext.Provider>
    )
}

export default PeerProvider
