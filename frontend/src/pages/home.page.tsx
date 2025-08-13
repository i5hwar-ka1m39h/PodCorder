import React, { useCallback, useEffect, useState } from "react";
import {useSocket} from "../providers/Socket"
import { useNavigate } from "react-router-dom";
const Home = () =>{
    const {socket} = useSocket();
    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("")

    const navigate = useNavigate()

    const handleListener = useCallback(({roomId}:{roomId:string}) =>{
        navigate(`/room/${roomId}`)    
    },[navigate])

    useEffect(()=>{
        socket.on("joined-room", handleListener)
    },[socket, handleListener])

    const handleJoinRoom = () =>{
        socket.emit("join-room", {roomId:roomId, emailId:email})
        setEmail("")
        setRoomId("")
    }
    return(
        <main className=" flex items-center justify-center h-screen">
            <div className=" flex flex-col items-center justify-center gap-5"> 
                <input type="text" placeholder="enter your email"  className=" border rounded-xl p-2" onChange={e=> setEmail(e.target.value)} value={email}/>
                <input type="text" placeholder="enter your room id" className=" border rounded-xl p-2" onChange={e=>setRoomId(e.target.value)} value={roomId}/>
                <button className="border bg-gray-400 p-2 rounded-2xl px-10 cursor-pointer" onClick={handleJoinRoom}>Submit</button>
            </div>

        </main>
    )
}

export default Home;