import {RequestInput} from "@/public/components/common/Inputs";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {useState} from "react";
import RequestUtilities from "@/public/components/product/RequestUtilities";
import {sendRequest} from "@/slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";
import {selectCurrentFileEntries, selectCurrentFileHeaders, selectCurrentFileName} from "@/slices/fileSlice";

export default function RequestArea() {
    const [input, setInput] = useState("");
    const noInput = input === "";
    const sub = useSelector(selectSub);
    const currentFileName = useSelector(selectCurrentFileName);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    const dispatch = useDispatch();

    const handleSendButtonClick = async () => {
        if (input === "") {
            return
        }
        dispatch(sendRequest({
            request: input,
            headers: currentFileHeaders,
            entries: currentFileEntries,
            fileName: currentFileName,
            id: sub,
        }))
        setInput("")
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            setInput(input + "\n")
        }
        else if (e.key === "Enter") {
            handleSendButtonClick()
        }
    }

    const handleInputChange = (e) => {
        let newInput = e.target.value
        if (newInput.length > 0 && newInput[newInput.length - 1] === "\n") {
            newInput = newInput.substring(0, newInput.length - 1)
        }
        setInput(newInput)
    }

    return (
        <>
            <RequestInput
                noinput={noInput.toString()}
                placeholder={"Make a request to stud..."}
                value={input}
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
            />
            <HeightSpacer height={"0.75rem"}/>
            <RequestUtilities input={input} handleSendButtonClick={handleSendButtonClick}/>
        </>
    )
}