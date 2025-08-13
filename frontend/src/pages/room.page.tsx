import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer'

const Room = () => {
    const {roomId} = useParams()
    const {socket} = useSocket();
    const {peer, createOffer} = usePeer()

    const doWhenUserJoins = useCallback( async({emailId}:{emailId:string}) =>{
      console.log("new user joined with email id", emailId);
      const offer = await createOffer()
      socket.emit("offer-send", {emailId, offer}) 
    }, [socket, createOffer])


    
    const handleForIncomingCalls = useCallback((data)=>{
      console.log("shittttttttttttttttttttt");
      
      const{from, offer} = data
      console.log("from",from, "offer", offer)    
    },[])

    useEffect(()=>{
      socket.on("user-joined", doWhenUserJoins);
      socket.on("incomming-call", handleForIncomingCalls);

      return () =>{
        socket.off("user-joined", doWhenUserJoins); 
        socket.off("incomming-call", handleForIncomingCalls)
      }

    },[socket, doWhenUserJoins, handleForIncomingCalls])


  return (
    <div>
        <h1>this is the room with id {roomId}</h1>
    </div>
  )
}

export default Room