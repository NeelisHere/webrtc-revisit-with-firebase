import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"

export const useOffersListener = (channelId) => {
    const [offers, setOffers] = useState([])
    useEffect(() => {
        const channelRef = ref(db, `Offers/${channelId}`);
        const unsubscribe = onValue(channelRef, (snapshot) => {
            let data = snapshot.val()
            data = Object.entries(data).map(
                ([channelId, { sdp, type, sender }]) => ({ channelId, sdp, type, sender })
            )
            setOffers(() => {
                console.log(data)
                return data
            })
        })
        return () => unsubscribe()
    }, [channelId])

    return { offers }
}