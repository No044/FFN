import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

//client send messages
const formsendmess = document.querySelector("[formsendmessclient]")
if(formsendmess){
    formsendmess.addEventListener("submit",(e) => {
        e.preventDefault()
        const data = formsendmess.querySelector("input")
        const content = data.value
        if(content){
            socket.emit("client_send_messages",content)
            data.value = ""

        }
        console.log(content) 
    })
}
//server render messages

socket.on("Sever_render_mess_client",(data) => {
    console.log(data)
    const chatbody = document.querySelector(".chat-body")
    const room = document.querySelector(".messages")
    const userid = room.getAttribute("myid")
    console.log(userid)
    const div = document.createElement("div")
    div.classList.add("message-item")
    if(userid == data.userid){
        div.classList.add("outgoing-message")
        div.innerHTML = `
        <div class="message-content">${data.content}</div>
        `
    }
    else{
        div.innerHTML = `
        <div class="message-avatar">
            <figure class="avatar">
                <img class="rounded-circle" src="images/women_avatar5.jpg" alt="image">
            </figure>
            <div>
                <h5>${data.infor.fullName}</h5>
                <div class="time">01:20 PM <i class="ti-double-check text-info"></i></div>
            </div>
        </div>
        <div class="message-content">${data.content}</div>
    `};
    const typing = document.querySelector(".inner-list-typing")
   room.insertBefore(div,typing)
   chatbody.scrollTop = chatbody.scrollHeight
   socket.emit("client_send_typing","hidden")

 })


 const chatbody = document.querySelector(".chat-body")
 if(chatbody){
    chatbody.scrollTop = chatbody.scrollHeight
 }

//icon
 const buttonemoji = document.querySelector("[buttonemoji]")
if(buttonemoji){
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonemoji, tooltip);
     buttonemoji.addEventListener("click",() => {
        tooltip.classList.toggle("shown")
    })
    const emojiPicker = document.querySelector("emoji-picker");
    const inputChat = document.querySelector("[inputchatclient]");

  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
     
  });
}


// typing

const inputsendmess = document.querySelector("[inputchatclient]")
let setimetyping;

if(inputsendmess)
{
    inputsendmess.addEventListener("keyup" , () => {
          socket.emit("client_send_typing","show")
          clearTimeout(setimetyping)
          setimetyping = setTimeout(() => {
            console.log("đã chạy vào remove")
            socket.emit("client_send_typing","hidden")
        },3000)
    })
        

}

socket.on("Sever_render_typing",(data) => {
    const id = data.infor._id
    console.log(data.infor._id)
    const typing = document.querySelector(".inner-list-typing")
    if(data.type == "show"){
        const div = document.createElement("div")
        div.classList.add("box-typing")
        div.setAttribute("userid",id)

        const check = typing.querySelector(`.box-typing[userid="${id}"]`)
        if(!check){
        div.innerHTML = `
            <div class="inner-name">${data.infor.fullName}</div>
            <div class="inner-dots">
                <span></span>
                <span></span>
                <span></span>`
        typing.appendChild(div)
    }
    }
    else{
        const childbox = typing.querySelector(`.box-typing[userid="${id}"]`)
        console.log(childbox)
        if(childbox){
            console.log(childbox)
        typing.removeChild(childbox)
        }
    
    }
   
})