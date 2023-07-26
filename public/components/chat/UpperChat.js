import {
    AssistantChatLine,
    AssistantChatMessage,
    UpperBox,
    UserChatLine,
    UserChatMessage
} from "@/public/components/common/Boxes";

export default function UpperChat(props) {
    return (
        <UpperBox ref={props.scrollableBoxRef}>
            {props.conversation.map((line) => {
                return (
                    <>
                        {line.type === "user" ?
                            <UserChatLine>
                                <UserChatMessage>{line.message}</UserChatMessage>
                            </UserChatLine>
                            :
                            <AssistantChatLine>
                                <AssistantChatMessage>{line.message}</AssistantChatMessage>
                            </AssistantChatLine>
                        }
                    </>
                )
            })}
        </UpperBox>
    )
}