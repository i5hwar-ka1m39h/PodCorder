
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/home.page'
import { SocketProvider } from './providers/Socket'
import Room from './pages/room.page'
import { PeerProvider } from './providers/Peer'

function App() {
  

  return (
    <>
    <SocketProvider>
      <PeerProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/room/:roomId" element={<Room/>}/>
      </Routes>
      </PeerProvider>
      </SocketProvider>
      
    </>
  )
}

export default App
