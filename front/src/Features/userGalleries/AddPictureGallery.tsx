import React, { useState } from "react";
import { Button, Grid, TextField, Input, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoadingCreatePicture } from "./gallerySlice";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { GalleryData, User } from "../../types";
import { selectUser } from "../users/usersSlice";
import { createPictureGallery } from "./galleryThunks";
import { useNavigate } from "react-router-dom";

const AddPictureGallery = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLoading = useAppSelector(selectLoadingCreatePicture);
  const user: User | null = useAppSelector(selectUser);
  const [pictureData, setPictureData] = useState<GalleryData>({
    title: "",
    image: null,
    user: user ? user.token : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPictureData({
      ...pictureData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPictureData({
        ...pictureData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmitCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    await dispatch(createPictureGallery(pictureData));
    navigate('/');
  }

  return (
    <>
    <Grid component="div" sx={{display: 'flex', alignItems: 'center'}}>
      <Grid component="form" onSubmit={handleSubmitCreate} sx={{
        flexBasis: '70%', display: 'flex', flexDirection: 'column'}}>
        <Grid component="h3">
        Add new photo
      </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            value={pictureData.title}
            onChange={handleChange}
            fullWidth
            sx={{maxWidth: '90%'}}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid component="div" sx={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
            <FileUploadIcon/>
            <Input type="file" name="image" onChange={handleFileChange}/>
          </Grid>
        </Grid>
        <Button type="submit" disabled={onLoading} sx={{
          color: '#000', fontWeight: 700, bgcolor: '#eee', padding: 2, borderRadius: 10,
          transition: 'transform 0.2s ease', width: '50%',
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: '#FFF',
          }
        }}>
          {onLoading ? <CircularProgress/> : 'Create'}
          </Button>
      </Grid>

      <Grid component="div" sx={{flexBasis: '40%', padding: '20px', bgcolor: '#242424', display: pictureData.image ? 'flex': 'none'}}>
        {pictureData.image && (
              <img src={URL.createObjectURL(pictureData.image)} alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '100%', marginRight: 10 }} 
              />
            )}
      </Grid>
    </Grid>
    </>
  );
};

export default AddPictureGallery;
