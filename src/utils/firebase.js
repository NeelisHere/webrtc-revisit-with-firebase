import { initializeApp } from "firebase/app";
import { getDatabase, onValue, remove } from 'firebase/database';
import { ref, push, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDt3FIiC9gl8z2DYTZZqtrBKsCCOTNHogc",
    authDomain: "webrtc-test-b064f.firebaseapp.com",
    projectId: "webrtc-test-b064f",
    storageBucket: "webrtc-test-b064f.appspot.com",
    messagingSenderId: "559940129125",
    databaseURL: 'https://webrtc-test-b064f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    appId: "1:559940129125:web:cd541180aa07e636e8d18c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const newChannelEntry = async (roomId, payload) => {
    const channeldbRef = ref(db, `Channels/${roomId}`)
    // console.log(payload)
    try {
        await push(channeldbRef, payload)
        console.log('Added channel entry.')
    } catch (error) {
        console.log('Couldn\'t add channel entry.')
    }
}

export const offersEntry = async (roomId, payload) => {
    const offersRef = ref(db, `Offers/${roomId}`)
    try {
        payload = {
            sender: payload.sender,
            type: payload.offer.type,
            sdp: payload.offer.sdp
        }
        console.log(payload)
        await push(offersRef, { ...payload })
        console.log('New offer entry.')
    } catch (error) {
        console.log('Couldn\'t add offer entry.')
    }
}

export const answersEntry = async (roomId, payload) => {
    const answersRef = ref(db, `Answers/${roomId}`)
    try {
        payload = {
            sender: payload.sender,
            type: payload.offer.type,
            sdp: payload.offer.sdp
        }
        console.log(payload)
        await push(answersRef, { ...payload })
        console.log('New answer entry.')
    } catch (error) {
        console.log('Couldn\'t add answer entry.')
    }
}

export const newRoomEntry = async (roomId, userId) => {
    const roomdbRef = ref(db, `Rooms/${roomId}/${userId}`)
    try {
        await set(roomdbRef, true)
        console.log('Added rooms entry.')
    } catch (error) {
        console.log('Couldn\'t add rooms entry.')
    }
}

export const leaveRoom = async (roomId, userId) => {
    const roomdbRef = ref(db, `Rooms/${roomId}/${userId}`)
    try {
        await remove(roomdbRef)
        console.log('Left room.')
    } catch (error) {
        console.log('Error leaving room.')
    }
}

export const answerListener = async (roomId, pc) => {
    const answersRef = ref(db, `Answers/${roomId}`);
    onValue(answersRef, (snapshot) => {
        let data = snapshot.val()
        data = Object.entries(data).map(
            ([channelId, { sdp, type, sender }]) => ({ channelId, sdp, type, sender })
        )
        console.log(data)
        data.forEach(({ type, sdp }) => {
            pc.setRemoteDescription({ type, sdp })
        });
    })
}

export const offerListener = async (roomId, pc) => {
    const offersRef = ref(db, `Offers/${roomId}`);
    onValue(offersRef, (snapshot) => {
        let data = snapshot.val()
        data = Object.entries(data).map(
            ([offerId, { sdp, type, sender }]) => ({ offerId, sdp, type, sender })
        )
        console.log(data)
        data.forEach(({ type, sdp }) => {
            pc.setRemoteDescription({ type, sdp })
        });
    })
}