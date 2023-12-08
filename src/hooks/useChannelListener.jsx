import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"

export const useChannelListener = (channelId) => {
    const [offers, setOffers] = useState([])
    useEffect(() => {
        const channelRef = ref(db, `Channels/${channelId}`);
        const unsubscribe = onValue(channelRef, (snapshot) => {
            let data = snapshot.val()
            data = Object.entries(data).map(
                ([channelId, { sdp }]) => ({ channelId, sdp })
            )
            setOffers(data)
        })
        return () => unsubscribe()
    }, [channelId])

    return { offers }
}