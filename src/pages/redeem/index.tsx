import { useRouter } from "next/router";
import { useEffect } from "react";

const RedeemPage = () => {
    const router = useRouter();
    const { redeemId, eventId} = router.query;

    useEffect(() => {
        if(redeemId && eventId){
            localStorage.setItem('redeemId', redeemId as string)
            localStorage.setItem('spent', 'false')
            localStorage.setItem('currentEvent', eventId as string)
            router.push('/create')
        }
    }, [redeemId, eventId])
    //http://localhost:3000/redeem/?redeemId=123&eventId=456

    return <div>
    </div>
}

export default RedeemPage;