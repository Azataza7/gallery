import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { apiURL } from "../../constants";
import { NavLink } from "react-router-dom";
import PictureModal from "../../Components/Modals/PictureModal";
import { Gallery } from "../../types";

interface Props {
  userPicture: Gallery;
}

const GalleryItem: React.FC<Props> = ({userPicture}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        alt="green iguana"
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
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  )
}

export default GalleryItem;