import react from "react"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from "./pages/login"
import RegisterForm from "./components/RegistrationForm"
import Home from "./pages/home"
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function Registerandlogout(){
  localStorage.clear()
  return <RegisterForm />
  
}
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
              <Home />
          </ProtectedRoute>
        }
       /> 
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={ <Registerandlogout/>} />
       <Route path="/logout" element={<Logout />} />
       <Route path="*" element = {<NotFound />}/>
    </Routes>


    </BrowserRouter>
  )
}

export default App
