/*
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const {notifications}=useContext(ChatContext);

export const unreadNotificationsFunc = (notifications) => {
    return notifications.filter((n) => n.isRead === false);
}
*/


export const unreadNotificationsFunc = (notifications) => {
    // Add a null/undefined check to avoid errors
    if (!notifications || !Array.isArray(notifications)) {
        return [];
    }
    return notifications.filter((n) => n.isRead === false);
};
