import Loading from "@/public/components/conditionals/Loading";
import {useSelector} from "react-redux";
import {selectDataProcessing} from "@/slices/dataSlice";
import {useEffect, useState} from "react";

export default function DisabledWrapper(WrappedPage) {
    return function Page(props) {
        const dataProcessing = useSelector(selectDataProcessing);
        const [disabled, setDisabled] = useState(false)

        useEffect(() => {
            if (document.getElementById("inner")) {
                if (disabled) {
                    document.getElementById("inner").style.setProperty("opacity", "0.5")
                    document.body.style.setProperty("overflow", "hidden")
                } else {
                    document.getElementById("inner").style.setProperty("opacity", "1")
                    document.body.style.setProperty("overflow", "auto")
                }
            }
        }, [disabled])
        useEffect(() => {
            if (dataProcessing) {
                setDisabled(true)
            }
            else {
                setDisabled(false)
            }
        }, [dataProcessing])
        return (
            <>
                <WrappedPage {...props} id={"inner"}/>
                <Loading/>
            </>
        )
    }
}