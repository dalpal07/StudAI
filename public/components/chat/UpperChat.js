import {
    AssistantChatLine,
    AssistantChatMessage,
    UpperBox,
    UserChatLine,
    UserChatMessage
} from "../../../public/components/common/Boxes";
import {ChatBubbleTailLeft, ChatBubbleTailRight} from "../../../public/components/common/Miscellaneous";

export default function UpperChat(props) {
    return (
        <UpperBox ref={props.scrollableBoxRef}>
            {props.conversation.map((line) => {
                return (
                    <>
                        {line.type === "user" ?
                            <UserChatLine>
                                <UserChatMessage>{line.message}</UserChatMessage>
                                <ChatBubbleTailRight src={"./images/user-chat-tail.svg"} alt={"chat-tail"} height={20} width={20}/>
                            </UserChatLine>
                            :
                            <AssistantChatLine>
                                <ChatBubbleTailLeft src={"./images/assistant-chat-tail.svg"} alt={"chat-tail"} height={20} width={20}/>
                                <AssistantChatMessage>{line.message}</AssistantChatMessage>
                            </AssistantChatLine>
                        }
                    </>
                )
            })}
        </UpperBox>
    )
}