import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"

export const useAnswersListener = (channelId) => {
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        const channelRef = ref(db, `Answers/${channelId}`);
        const unsubscribe = onValue(channelRef, (snapshot) => {
            let data = snapshot.val()
            data = Object.entries(data).map(
                ([channelId, { sdp, type, sender }]) => ({ channelId, sdp, type, sender })
            )
            setAnswers(() => {
                console.log(data)
                return data
            })
        })
        return () => unsubscribe()
    }, [channelId])

    return { answers }
}