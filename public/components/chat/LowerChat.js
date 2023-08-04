import {BottomBox, ChatInputOuterBox} from "../../../public/components/common/Boxes";
import {ChatInput} from "../../../public/components/common/Inputs";
import {IconButton} from "../../../public/components/common/Buttons";
import Image from "next/image";
import {useState} from "react";

export default function LowerChat(props) {
    const [input, setInput] = useState("");
    const [sendHover, setSendHover] = useState(false);
    const sendDisabled = props.disabled || props.fileName === "" || input === "";

    const handleInputChange = (event) => {
        let temp = event.target.value
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
    const handleSendButtonClick = () => {
        if (input === "") {
            return
        }
        props.setConversation([...props.conversation, {type: "user", message: input}])
        setInput("")
    }
    return (
        <BottomBox>
            <ChatInputOuterBox>
                <ChatInput placeholder="What can Stud do for you today?"
                           multiline
                           hasvalue={(input !== "").toString()}
                           disableUnderline={true}
                           disabled={props.disabled}
                           value={input}
                           onChange={handleInputChange}
                           onKeyPress={handleKeyPress}/>
            </ChatInputOuterBox>
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