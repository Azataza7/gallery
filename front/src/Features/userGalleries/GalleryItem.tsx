import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { apiURL } from "../../constants";
import { NavLink } from "react-router-dom";
import PictureModal from "../../Components/Modals/PictureModal";
import { Gallery } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { deleteAdminUsersPicture, fetchGallery } from "./galleryThunks";

interface Props {
  userPicture: Gallery;
}

const GalleryItem: React.FC<Props> = ({userPicture}) => {
  const [openModal, setOpenModal] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAdminDeleteUsersPicture = async () => {
    const data = {
      id: userPicture._id,
      token: user ? user.token : ''
    }

    await dispatch(deleteAdminUsersPicture(data))
    await dispatch(fetchGallery());
  }

  return (
    <>
    <PictureModal 
      open={openModal} 
      onClose={handleCloseModal} 
      picture={userPicture.image}
    />
    <Grid component='div' sx={{flexBasis: '30%'}} >
       <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        alt={userPicture.title + 'image'}
        height="180"
        image={apiURL + '/' + userPicture.image}
        sx={{cursor: 'pointer'}}
        onClick={handleOpenModal}
      />
      <CardContent>
        <Grid component="div">
          <Typography 
          gutterBottom 
          variant="h5" 
          component={NavLink} to={'/'}
          sx={{color: '#000', textDecoration: 'none', '&:hover': {textDecoration: 'underline'}}}
          >
          {userPicture.title}
        </Typography>
        </Grid>
        <Typography 
        variant="body2" 
        component={NavLink} to={`/my-gallery/${userPicture.user._id}`} 
        color="text.secondary"
        sx={{textDecoration: 'none', '&:hover': {textDecoration: 'underline'}}}>
          by {userPicture.user.displayName}
        </Typography>
      </CardContent>
      <CardActions>
        {user?.role === 'admin' && 
        <Button size="small" onClick={handleAdminDeleteUsersPicture}>Delete</Button>
        }
      </CardActions>
    </Card>
    </Grid>
    </>
  )
}

export default GalleryItem;