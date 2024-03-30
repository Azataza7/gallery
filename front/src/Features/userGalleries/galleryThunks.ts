import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Gallery, GalleryData, ValidationError } from "../../types";
import { isAxiosError } from "axios";

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

export const deleteAdminUsersPicture = createAsyncThunk<
  void,
  dataType,
  { rejectValue: ValidationError }
>("gallery/admin-delete", async (data) => {
  await axiosApi.delete(`/gallery/${data.id}`, {
    headers: { Authorization: data.token },
  });
}); 

export const createPictureGallery = createAsyncThunk<void, GalleryData, { rejectValue: ValidationError }>
("gallery/newPicture", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image);
    }

    await axiosApi.post("/gallery", formData, {
      headers: { Authorization: data.user },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});