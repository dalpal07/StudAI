import Loading from "@/public/components/conditionals/Loading";
import {useSelector} from "react-redux";
import {selectDisabled} from "@/slices/dataSlice";
import {useEffect} from "react";
import DataUpload from "@/public/components/conditionals/DataUpload";

export default function DisabledWrapper(WrappedPage) {
    return function Page(props) {
        const disabled = useSelector(selectDisabled);

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
        return (
            <>
                <WrappedPage {...props} id={"inner"}/>
                <DataUpload/>
                <Loading/>
            </>
        )
    }
}