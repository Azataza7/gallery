import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Gallery } from "../../types";

export const fetchGallery = createAsyncThunk<Gallery[]>(
  'gallery', async () => {
    const response = await axiosApi.get('/gallery');

    return response.data;
  }
);

export const fetchUserGallery = createAsyncThunk<Gallery[], string>(
  'gallery/userGallery', async (userId) => {
    const response = await axiosApi.get(`/gallery/${userId}`);

    return response.data;
  }
);

interface dataType {
  id: string;
  token: string;
}

export const deleteOwnPicture = createAsyncThunk<void, dataType>(
  'gallery/user-delete', async (data) => {
    await axiosApi.delete(`/gallery/my-gallery/${data.id}`, {headers: {Authorization: data.token}})
  }
);

export const deleteAdminUsersPicture = createAsyncThunk<void, dataType>(
  'gallery/admin-delete', async (data) => {
    await axiosApi.delete(`/gallery/${data.id}`, {headers: {Authorization: data.token}});
  }
) 
