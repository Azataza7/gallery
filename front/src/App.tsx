import { Container, Typography } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import Register from "./Features/users/Register"
import Gallery from "./Features/userGalleries/Gallery"
import AppToolbar from "./Components/AppToolbar/AppToolbar"
import Login from "./Features/users/Login"

function App() {

  return (
    <>
       <main>
        <Container>
          <header>
            <AppToolbar/>
          </header>
          <Routes>
            <Route path="/" element={(<Gallery/>)}/>
            <Route path="/register" element={(<Register/>)}/>
            <Route path="/login" element={(<Login/>)}/>
            <Route path="*" element={(
              <Typography variant="h3">Not Found!</Typography>
            )}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
