const path = require('path')
const express = require ('express')
const http = require ('http')
const socketio = require ('socket.io')
const MessageForamt = require ('./tools/messages')



const app = express ();
const server = http.createServer(app)
const io = socketio (server)
const chatInf = "Chat updates"


app.use(express.static(path.join(__dirname, 'public')))


io.on ('connection' , socket => {

    // PRINT CONNECTED CLIENT ON SERVER CONSOLE 
    console.log('new client is connected !')


    //SEND MESSAGE TO CLIENT
    socket.emit ('Bot' , 'You are connected')

    //SEND MESSAGE TO ALL CONNECTED CLIENT
    socket.broadcast.emit('Bot' , 'Someone has enter this chatRoom')

    //CATCH CHAT MESSAGES FROM ALL CLIENTS
    socket.on('chatmsg' , message => {
    
    //RESEND MESSAGE TO CLIENT
    socket.emit('message' , MessageForamt('someone',message))

     //RESEND MESSAGE ALL CLIENT EXPECT THE SENDER
    socket.broadcast.emit('Brodmessage' , MessageForamt('someone',message))

    })
    
    //IF SOMEONE LEAVE THE CHATROOM
    socket.on('disconnect' , () => {

        //SEND MESSAGE TO ALL CONNECTED CLIENTS
        io.emit ('Bot' , 'Someone has left this chatRoom')

    })

})


const PORT = 3000 || process.env.PORT ;









server.listen (PORT , () => {
    console.log (`server runing at ${PORT} ...`)
})
