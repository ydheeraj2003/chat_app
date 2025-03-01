const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
//const {Server}=require("socket.io");

const dotenv=require("dotenv");
const userRoute=require("./Routes/userRoute");
const chatRoute=require("./Routes/chatRoute");
const messageRoute=require("./Routes/messageRoute");

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
const port=process.env.PORT || 5001;
const uri=process.env.MONGO_URI;

app.listen(port, (req,res) => {
    console.log(`server running on port: ${port}`);
});

mongoose.connect(uri).then(() => console.log("mongodb connected")).catch((error) => console.log(error));
app.get("/", (req,res) => {
    res.send("welcome");
});

{/*  
const io = new Server(expressServer, { cors: "http://localhost:5173" });

onlineUsers=[];
io.on("connection", (socket) => {
  console.log("new connection: ", socket.id);

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) && 
    onlineUsers.push({
        userId,
        socketId: socket.id
    });
    console.log("online users: ", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  })

  socket.on("disconnect", () => {
    onlineUsers=onlineUsers.filter((user) => socket.id !== user.socketId);
    io.emit("getOnlineUsers", onlineUsers);
  })

  socket.on("sendMessage", (message) => {
    const user=onlineUsers.find(user => user.userId === message.recipientId);
    if (user){
        io.to(user.socketId).emit("getMessage", message)
        io.to(user.socketId).emit("getNotification", {
            senderId: message.senderId,
            isRead: false,
            date: new Date()
        })
    }
  })
});
*/}