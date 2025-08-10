
import './App.css'
import {Route, Routes} from "react-router-dom"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className='bg-red-400 text-3xl'>hellow shit</h1>}/>
        <Route path="/twe" element={<h1>hellow twe</h1>}/>
      </Routes>
    </>
  )
}

export default App
