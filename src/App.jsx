
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import CourseDetails from './Pages/CourseDetails'



function App() {
  

  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-details" element={<CourseDetails />} />

      </Routes>
     
    </>
  )
}

export default App
