// established connection
const socket = io();

let myBtn = document.getElementById("add-user");

myBtn.addEventListener("click",(event) => {
    event.preventDefault();
    let userName =document.getElementById("username-input").value;
    if(userName != "")
    {
        let login = document.querySelector(".formUsername");
            login.style.display ="none";

        let chatRoom = document.querySelector(".chatRoom");
            chatRoom.style.display ="block";
        let user = document.querySelector("h1");
        user.innerText =`ChAt-Room... of__${userName}__`;

        socket.emit("username enter",userName);
    }else{
        alert("Username cannot be Empty");
    }
    
});


let sendBtn = document.getElementById("send-btn");



   sendBtn.addEventListener("click",(event) =>{
        event.preventDefault();
        let msgWritten =document.getElementById("sending-input").value;
        let userName =document.getElementById("username-input").value;
        const data ={
            username : userName,
            message : msgWritten
        };

        socket.emit("chat message", data);
        // communicate with the watchman that a message is sent to
        addMessage(data, true);
        });

   //receive user enterred
   socket.on("username enter",(data) => {
    let userName =document.getElementById("username-input").value;
       if(data !== userName){
        let column =document.querySelector(".message-container");
        let msgDiv = document.createElement("div");
        msgDiv.innerHTML +=`
                          <div class="entering">
                           <p>${data} has entered!</p>
                          </div>`;
           column.appendChild(msgDiv);                 
       }
   });

   //receive msessage
   socket.on("chat message", (data) =>{
    let userName =document.getElementById("username-input").value;
       if(data.username !== userName){
        addMessage(data,false);
       }
   });     

function addMessage(data, flag){
    let column =document.querySelector(".message-container");
    let msgDiv = document.createElement("div");
    if(flag){
    
         msgDiv.innerHTML += ` 
                             <div class="receiver-part">
                             <span>${data.username} : ${data.message}</span>
                             </div>`;
    }
    else{
        msgDiv.innerHTML += `
                           <div class="sender-part">
                           <span>${data.username} : ${data.message}</span>
                           </div>`;
    }

    column.appendChild(msgDiv);
};

let exitBtn =document.getElementById("closeBtn");

exitBtn.addEventListener('click',() =>{
    let userName =document.getElementById("username-input").value; 
    socket.emit("username left",userName);
});

socket.on("username left", (data) =>{
    let userName =document.getElementById("username-input").value;

        if(data !== userName){
         let column =document.querySelector(".message-container");
         let msgDiv = document.createElement("div");
         msgDiv.innerHTML +=`
                           <div class="left">
                            <p>${data} has left!</P>
                           </div>`;
            column.appendChild(msgDiv);                 
        }
       
   });
