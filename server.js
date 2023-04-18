
const express = require("express");

const app = express();

const server = require("http").Server(app);

app.use(express.static("public"));



const io = require("socket.io")(server);


io.on("connection", (socket) =>{
   
    console.log("User connected:", socket.id);


    

   socket.on("chat message", (data) =>{
      
       io.emit("chat message", data);
       console.log("message is being sent to everyone",data.message);
    });

    socket.on("username enter",(data)=>{
       io.emit("username enter", data);
    });

    socket.on("username left",(data) =>{
       io.emit("username left",data);
    });

    socket.on("disconnect", () =>{
       console.log("User disconnected:", socket.id);
   
    });

});

const PORT =  process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
