import React from "react";
import { useRouter } from 'next/router';



export default function Editor() {

    const router = useRouter()
    const { fid } = router.query

    return (
        <div>
            {fid}
        </div>
    )
}