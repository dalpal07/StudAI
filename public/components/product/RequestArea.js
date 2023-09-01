import {RequestInput} from "@/public/components/common/Inputs";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {useState} from "react";
import RequestUtilities from "@/public/components/product/RequestUtilities";

export default function RequestArea() {
    const [input, setInput] = useState("");
    const noInput = input === "";

    return (
        <>
            <RequestInput
                noinput={noInput.toString()}
                placeholder={"Make a request to stud..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <HeightSpacer height={"0.75rem"}/>
            <RequestUtilities input={input}/>
        </>
    )
}