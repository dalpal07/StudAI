import {BottomBox, ChatInputOuterBox, StackColumnBox} from "../../../public/components/common/Boxes";
import {ChatInput} from "../../../public/components/common/Inputs";
import {IconButton} from "../../../public/components/common/Buttons";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";

const limit = 500

export default function LowerChat(props) {
    const [input, setInput] = useState("");
    const [sendHover, setSendHover] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const sendDisabled = props.disabled || props.fileName === "" || input === "";

    const handleInputChange = async (event) => {
        let temp = event.target.value
        if (temp.length > limit) {
            temp = temp.substring(0, limit)
            await setInput(temp)
            setIsRed(true)
            return
        }
        if (temp.length > 0 && temp[temp.length - 1] === "\n") {
            temp = temp.substring(0, temp.length - 1)
        }
        setInput(temp)
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (props.fileName !== "") {
                handleSendButtonClick()
            }
        }
    };
    const handleSendButtonClick = async () => {
        if (input === "") {
            return
        }
        await props.setReq(input)
        setInput("")
    }
    useEffect(() => {
        if (isRed) {
            setTimeout(() => {
                setIsRed(false)
            }, 750)
        }
    }, [isRed])
    return (
        <BottomBox>
            <StackColumnBox style={{alignItems: "flex-end", width: "100%"}}>
                <ChatInputOuterBox style={{boxSizing: "border-box"}}>
                    <ChatInput placeholder="What can Stud do for you today?"
                               multiline
                               hasvalue={(input !== "").toString()}
                               disableUnderline={true}
                               disabled={props.disabled}
                               value={input}
                               onChange={handleInputChange}
                               onKeyPress={handleKeyPress}/>
                </ChatInputOuterBox>
                <Typography style={{display: "flex", padding: "0.25rem", color: isRed ? "#ff6961" : "#a9a9a9"}}>{input.length} / {limit}</Typography>
            </StackColumnBox>
            <IconButton onClick={handleSendButtonClick} disableTouchRipple disabled={sendDisabled}
                        onMouseEnter={() => setSendHover(true)} onMouseLeave={() => setSendHover(false)}>
                <Image src={
                    sendDisabled ?
                        "/images/send-disabled.svg"
                        :
                        sendHover ?
                            "/images/send-hover.svg"
                            :
                            "/images/send.svg"
                } alt={"Send"} width={40} height={40}/>
            </IconButton>
        </BottomBox>
    )
}