
const { Server } = require("socket.io");

const io = new Server({ cors: "https://chat-app-frontend-g3f7.onrender.com" });

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

io.listen(3000);
