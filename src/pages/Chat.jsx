

import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);

  console.log("user chats: ", userChats);

  // Handle loading and errors
  if (isUserChatsLoading) return <p>Loading chats...</p>;
  if (userChatsError) return <p>Error loading chats: {userChatsError.message || "Unknown error"}</p>;
 
  
  return (
    <Container fluid className="p-4">
      <PotentialChats />
      
      {/* Flexbox for Side-by-Side Layout */}
      <div className="flex-row w-full gap-4">
        
        
        <div className="w-1/3 min-w-[250px] max-w-xs overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
          {isUserChatsLoading && <p>Loading chats..</p>}
          {userChats?.length > 0 &&
            userChats.map((chat, index) => (
              <div
                key={index}
                onClick={() => updateCurrentChat(chat)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition"
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))}
        </div>
  
        
        
          <div className="flex-1 w-2/3 bg-white p-4 rounded-lg shadow-md">
            <ChatBox/>
          </div>
        
  
      </div>
    </Container>
  );

};

export default Chat;
