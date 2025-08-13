import express from "express"
import {Server} from "socket.io"

const app = express()

const io = new Server({
    cors:{origin:"*"}
})

app.use(express.json())

const emailToSocketIdMap = new Map()
const socketToEmailMap = new Map()

io.on("connection",(socket)=>{
    console.log("New connection");
    
    socket.on("join-room", (data)=>{
        const {roomId, emailId} = data;

        console.log("JOINED:", emailId, "->", socket.id);
        
        socket.emit("joined-room", {roomId});
        emailToSocketIdMap.set(emailId, socket.id);
        socketToEmailMap.set(socket.id, emailId)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("user-joined", {emailId})
    })

    socket.on("offer-send", (data)=>{
        const {emailId, offer} = data;

        const socketId = emailToSocketIdMap.get(emailId);

        const from = socketToEmailMap.get(socket.id)

        console.log("email map:", emailToSocketIdMap, "\n socket map:", socketToEmailMap);
        
        console.log(`email from front ${emailId} \n offer from front ${JSON.stringify(offer)} `);

        console.log(`sending to emailId ${emailId} and socket ${socketId} from current socket ${socket.id}`);
        

        socket.to(socketId).emit("incomming-call", {from, offer});

    })

    socket.on("disconnect", ()=>{
        console.log("disconnected", socket.id);
        

    })
})

app.listen(3000, ()=>{
    console.log("api endpoints listening on 3000");   
})

io.listen(3001)