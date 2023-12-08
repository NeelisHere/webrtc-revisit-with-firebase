class WebRTC {
    async createOffer(peerConnection) {
        try {
            const offer = await peerConnection.createOffer()
            console.log('offer created: ', offer)
            await peerConnection.setLocalDescription(offer);
            console.log('Local description set successfully.')
            return offer;
        } catch (error) {
            console.log('error creating offer: ', error)
        }
    }
}

export default WebRTC

