import React, { useMemo,  } from "react";
import {io, Socket} from 'socket.io-client'

const SocketContext = React.createContext<Socket|null>(null);

export const useSocket = () =>{
    const socket =  React.useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props) =>{
    const socket = useMemo(()=>io("http://localhost:3001"),[])

    return(
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}