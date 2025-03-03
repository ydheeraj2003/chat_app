
import { useContext, useRef, useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecepient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipient(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    
    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    if (!recipientUser) {
        return <p style={{ textAlign: "center", width: "100%" }}>No conversation selected..</p>;
    }

    if (isMessagesLoading) {
        return <p style={{ textAlign: "center", width: "100%" }}>Loading chats..</p>;
    }

   
    
    return (
        <Stack className="chat-box md:w-[80%]" gap={4}>
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>

            

            <Stack gap={3} className="messages">
    {messages &&
        messages.map((message, index) => (
            <Stack
                key={index}
                ref={scroll}
                className={`${
                    message?.senderId === user?._id
                        ? "message self align-self-end flex-grow-0"
                        : "message align-self-start flex-grow-0"
                }`}
                style={{
                    maxWidth: "75%",  // Prevents message from taking full width
                    wordWrap: "break-word",  // Ensures long words wrap properly
                    overflowWrap: "break-word",  // Breaks long words correctly
                    padding: "8px",  // Adds some spacing
                    borderRadius: "10px",  // Makes it look better
                    backgroundColor: message?.senderId === user?._id ? "#000000" : "#000000",
                    alignSelf: message?.senderId === user?._id ? "flex-end" : "flex-start",
                }}
            >
                <span style={{ whiteSpace: "pre-wrap" }}>{message.text}</span>
                <span style={{ fontSize: "10px", display: "block", marginTop: "4px" }}>
                    {moment(message.createdAt).calendar()}
                </span>
            </Stack>
        ))}
</Stack>

            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTextMessage} borderColor="rgba(72, 112, 223, 0.2)" />
                <button
                    className="send-btn"
                    onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                </button>
                
            </Stack>
        </Stack>
    );
    

};

export default ChatBox;
