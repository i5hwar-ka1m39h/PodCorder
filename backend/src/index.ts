import express from "express"
import {Server as Socketio, } from "socket.io"
import http from "http"
import path from "path"


interface ClientToServerEvents{
    "outgoing:call" :(data: {offer:RTCSessionDescriptionInit, to:string}) =>void
    "call:accepted" :(data : {answer:RTCSessionDescriptionInit, to:string})=>void
}

interface ServerToClientEvents{
    "user:joined":(id:string)=>void
    "incomming:call":(data:{from:string, offer:RTCSessionDescriptionInit})=>void
    "incomming:answer":(data:{from:string, answer:RTCSessionDescriptionInit})=>void
    "user:disconnected":(data:string)=>void
    "hello":({id}:{id:string})=>void
}

const port = process.env.DEV_PORT
const app = express()
const server = http.createServer(app)

const io = new Socketio<ClientToServerEvents, ServerToClientEvents >(server)

app.use(express.static(path.resolve("./public")))
console.log("public folder path", path.resolve("./public"));


const users = new Map<string, string>()

app.get("/users", (req, res)=>{
    try {
        return res.status(200).json(Array.from(users));
    } catch (error) {
        console.log("error occured", error);
        
    }
})

io.on("connection", (socket)=>{
    console.log(`user connect with id: ${socket.id}`);
    users.set(socket.id, socket.id)
    socket.broadcast.emit("user:joined", socket.id)

    socket.emit("hello", {id: socket.id})

    socket.on("outgoing:call", (data)=>{
        const{offer, to} = data;
        socket.to(to).emit("incomming:call", {from:socket.id, offer:offer})
    })

    socket.on("call:accepted", (data)=>{
        const{answer, to} = data;
        socket.to(to).emit("incomming:answer", {from : socket.id, answer:answer })
    })
    
    socket.on("disconnect", ()=>{
        console.log(`user disconnected id: ${socket.id}`);
        users.delete(socket.id)
        socket.broadcast.emit("user:disconnected", socket.id)
    })
})



server.listen(port, ()=>console.log(`server is running on port ${port}`))
