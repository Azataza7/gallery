import { Container, Typography } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import Register from "./Features/users/Register"
import Gallery from "./Features/userGalleries/Gallery"
import AppToolbar from "./Components/AppToolbar/AppToolbar"
import Login from "./Features/users/Login"
import UserGallery from "./Features/userGalleries/UserGallery"
import AddPictureGallery from "./Features/userGalleries/AddPictureGallery"

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
            <Route path="/add-picture" element={(<AddPictureGallery/>)}/>
            <Route path="/my-gallery/:id" element={(<UserGallery/>)}/>
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
