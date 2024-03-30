import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Gallery } from "../../types";

export const fetchGallery = createAsyncThunk<Gallery[]>(
  'gallery', async () => {
    const response = await axiosApi.get('/gallery');

    return response.data;
  }
)

export const fetchUserGallery = createAsyncThunk<Gallery[], string>(
  'gallery/userGallery', async (userId) => {
    const response = await axiosApi.get(`/gallery/${userId}`);

    return response.data;
  }
)