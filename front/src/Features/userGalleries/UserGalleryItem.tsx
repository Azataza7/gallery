import React, { useState } from "react";
import { Gallery } from "../../types";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import PictureModal from "../../Components/Modals/PictureModal";
import { apiURL } from "../../constants";

interface Props {
  userGallery: Gallery;
}

const UserGalleryItem:React.FC<Props> = ({userGallery}) => {
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
      picture={userGallery.image}
    />
    <Grid component='div' sx={{flexBasis: '30%'}} >
       <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="180"
        image={apiURL + '/' + userGallery.image}
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
          {userGallery.title}
        </Typography>
        </Grid>
        <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{textDecoration: 'none', '&:hover': {textDecoration: 'underline'}}}>
          by {userGallery.user.displayName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  );
};

export default UserGalleryItem;