import React, { useState } from "react";
import { Button, Grid, TextField, Input } from "@mui/material";
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

    console.log(pictureData);
    console.log(user)
    await dispatch(createPictureGallery(pictureData));
    navigate('/');
  }

  return (
    <>
      <Grid component="form" onSubmit={handleSubmitCreate}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            value={pictureData.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid component="div" sx={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
            <FileUploadIcon/>
            <Input type="file" name="image" onChange={handleFileChange}/>
          </Grid>
        </Grid>
        <Button type="submit" disabled={onLoading}>Create</Button>
      </Grid>
    </>
  );
};

export default AddPictureGallery;
