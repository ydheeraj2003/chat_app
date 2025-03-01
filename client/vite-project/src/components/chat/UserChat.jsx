import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../hooks/useFetchRecepient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({chat, user}) => {
    const {recipientUser}=useFetchRecipient(chat, user);
    const {onlineUsers, userChats, notifications, markThisUserNotificationsAsRead} = useContext(ChatContext);

    const unreadNotifications=unreadNotificationsFunc(notifications);
    const {latestMessage}=useFetchLatestMessage(chat);

    const thisUserNotifications = unreadNotifications.filter(
        n => n.senderId === recipientUser?._id
    )

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

    console.log(recipientUser);

    const truncateText = (text) => {
        if (!text || typeof text !== "string") {
            return ""; // Return an empty string if the input is invalid
        }
    
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + "...";
        }
        return shortText;
    };

    
    return (<Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between w-[20%] md:w-[25%] sm:w-[35%] xs:w-[50%] min-w-[120px] flex-shrink" role="button" 
    onClick={() => {
        if (Array.isArray(thisUserNotifications) && thisUserNotifications.length > 0) {
            markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
    }}>
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px"/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{truncateText(latestMessage?.text)}</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                {moment(latestMessage?.createdAt).calendar()}
            </div>
            <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>{thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}</div>
            <span className={isOnline ? "user-online" : ""}></span>
        </div>


    </Stack>);
    
}
export default UserChat;