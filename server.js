// intialising all variables
const express = require("express");
// set's up our express --> express allow me to create a server
const app = express();
//HTTP--.info exchange
const server = require("http").Server(app);

// above code--> creating a medium to send and recieve data

//index.html file from public folder
app.use(express.static("public"));


// socket io intialisation-what is socket
const io = require("socket.io")(server);
// socket.io and combining it with my server.

//socket io is my watchman,ehich keeps a register and track
//every event,if anything happen, this waechman alerts everyone


 // a message is sent, so every one receive that message

io.on("connection", (socket) =>{
   // console.log(socket);
    console.log("User connected:", socket.id);


    //established connection

   socket.on("chat message", (data) =>{
       //watchman to give everyone msg
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
