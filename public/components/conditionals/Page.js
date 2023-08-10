import Product from "../../../pages/product";
import Welcome from "../../../pages/welcome";
import BetaAnnouncement from "../../../pages/beta-announcement";
import {useState} from "react";

async function getIsWhiteListed(user) {
    const response = await fetch("/api/whitelist", {
        method: "POST",
        body: JSON.stringify(user)
    })
    if (response.status === 200) {
        const data = await response.json()
        return data.isWhiteListed
    }
    else {
        return false
    }
}


export default function Page(props) {
    const [isWhiteListed, setIsWhiteListed] = useState(false)
    if (props.user) {
        getIsWhiteListed(props.user).then(data => {
            setIsWhiteListed(data)
        })
        if (isWhiteListed) {
            return (
                <Product/>
            )
        }
        else if (isWhiteListed === false) {
            return (
                <BetaAnnouncement/>
            )
        }
    }
    return (
        <Welcome/>
    )
}