import React, { useState } from "react";
import { Gallery } from "../../types";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import PictureModal from "../../Components/Modals/PictureModal";
import { apiURL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { deleteOwnPicture, fetchUserGallery } from "./galleryThunks";
import { selectLoadingDeletePictureGalleries } from "./gallerySlice";

interface Props {
  userGallery: Gallery;
}

const UserGalleryItem:React.FC<Props> = ({userGallery}) => {
  const user = useAppSelector(selectUser);
  const userId = useParams().id;
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const onLoadingDelete = useAppSelector(selectLoadingDeletePictureGalleries);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteUser = async () => {
    const data = {
      id: userGallery._id,
      token: user ? user.token : ''
    }

    await dispatch(deleteOwnPicture(data));
    await dispatch(fetchUserGallery(userId ? userId : ''));
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
      </CardContent>
      <CardActions>
        {userGallery.user._id === user?._id && 
        <Button size="small" onClick={handleDeleteUser} disabled={onLoadingDelete}>
          Delete
          </Button>
        }
      </CardActions>
    </Card>
    </Grid>
    </>
  );
};

export default UserGalleryItem;