import {BottomBox, ChatInputOuterBox, StackColumnBox} from "@/public/components/common/Boxes";
import {ChatInput} from "@/public/components/common/Inputs";
import {IconButton} from "@/public/components/common/Buttons";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";

const limit = 500

async function handleFileMatch(id, fileName, setExtraFiles) {
    const response = await fetch(`/api/user/files/get-file-content`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            fileName: fileName
        })
    });
    if (response.status !== 200) {
        return
    }
    const data = await response.json();
    const headers = data.headers;
    const entries = data.entries;
    const extraFiles = [{fileName: fileName, headers: headers, entries: entries}];
    await setExtraFiles(extraFiles);
}

export default function LowerChat(props) {
    const [input, setInput] = useState("");
    const [sendHover, setSendHover] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const sendDisabled = props.disabled || props.fileName === "" || input === "";
    const router = useRouter();
    const {query} = router;
    const {user} = useUser();

    if (query && query.input) {
        if (input === "") {
            setInput(query.input);
        }
        router.replace(router.pathname, undefined, { shallow: true });
    }

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
        const matchResult = input.match(/`(.+)`/g)
        if (matchResult) {
            let match = matchResult[0]
            if (match.length > 1) {
                match = match.substring(1, match.length - 1)
                for (let i = 0; i < props.files.length; i++) {
                    if (props.files[i] === match) {
                        await handleFileMatch(user.sub, match, props.setExtraFiles)
                    }
                }
            }
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