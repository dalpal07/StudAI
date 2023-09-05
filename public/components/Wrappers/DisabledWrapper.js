import Loading from "@/public/components/conditionals/Loading";
import {useSelector} from "react-redux";
import {selectDataProcessing, selectDataUpload} from "@/slices/dataSlice";
import {useEffect, useState} from "react";
import DataUpload from "@/public/components/conditionals/DataUpload";

export default function DisabledWrapper(WrappedPage) {
    return function Page(props) {
        const dataProcessing = useSelector(selectDataProcessing);
        const dataUpload = useSelector(selectDataUpload);
        const [disabled, setDisabled] = useState(false)

        useEffect(() => {
            if (document.getElementById("inner") === null) {
                return
            }
            if (disabled) {
                document.getElementById("inner").style.setProperty("opacity", "0.5");
                document.body.style.setProperty("overflow", "hidden");
            } else {
                document.getElementById("inner").style.setProperty("opacity", "1");
                document.body.style.setProperty("overflow", "auto");
            }
        }, [disabled])
        useEffect(() => {
            if (dataProcessing || dataUpload) {
                setDisabled(true)
            }
            else {
                setDisabled(false)
            }
        }, [dataProcessing, dataUpload])
        return (
            <>
                <WrappedPage {...props} id={"inner"}/>
                <DataUpload/>
                <Loading/>
            </>
        )
    }
}