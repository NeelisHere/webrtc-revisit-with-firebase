import { initializeApp } from "firebase/app";
import { getDatabase, remove } from 'firebase/database';
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
    console.log(payload)
    try {
        await push(channeldbRef, payload)
        console.log('Added channel entry.')
    } catch (error) {
        console.log('Couldn\'t add channel entry.')
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
