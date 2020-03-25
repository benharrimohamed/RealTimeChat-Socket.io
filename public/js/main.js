const socket = io ()
const chatForm = document.getElementById('chat-form')
const chatPanel = document.querySelector('.jumbotron')
const msgforThem = 'from-them'
const msgforMe = 'from-them'


//PRINT BOT MESSAGES

socket.on ('Bot' , message => {

    const div = document.createElement ('div')
    div.classList.add ('text-info')
    div.classList.add ('mb-3')
    div.innerHTML = ` 
    <center><small>${message}</small></center>`

    document.getElementById("jumbotron").appendChild(div)

    //SCROLL DOWN 
    chatPanel.scrollTop = chatPanel.scrollHeight

})

//PRINT MY MESSAGES ON CHAT PANEL
socket.on ('message' , message => {

    outputMsgMe (message)

    //SCROLL DOWN 
    chatPanel.scrollTop = chatPanel.scrollHeight

})

//PRINT OTHER CONNECTED CLIENT MESSAGES
socket.on ('Brodmessage' , message => {


    outputMsgThem (message)

    //SCROLL DOWN 
    chatPanel.scrollTop = chatPanel.scrollHeight
})


//CATCH MESSAGE FROM DOM 
chatForm.addEventListener ('submit' , (e) => {
    e.preventDefault();
    const message = e.target.elements.msg.value;

    //SEND MESSAGE TO SERVEUR SIDE 
    socket.emit('chatmsg' , message);

    e.target.elements.msg.value = '' 
    e.target.elements.msg.value.focus()
})


function outputMsgThem (message) {

    const div = document.createElement ('p')
    div.classList.add ('from-them')
    div.innerHTML = ` 
    <div> ${message.text} </div>
    <small class="mb-0 time">${message.time}</small>`

    document.getElementById("jumbotron").appendChild(div)
}

function outputMsgMe (message) {

    const div = document.createElement ('p')
    div.classList.add ('from-me')
    div.innerHTML = ` 
    <div> ${message.text} </div>
    <small class="mb-0 time">${message.time}</small>`

    document.getElementById("jumbotron").appendChild(div)
}
