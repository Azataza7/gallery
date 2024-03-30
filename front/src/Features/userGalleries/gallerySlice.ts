import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Gallery } from "../../types";
import { fetchGallery, fetchUserGallery } from "./galleryThunks";

interface galleryState {
  gallery: Gallery[] | [];
  userGallery: Gallery[] | [];

  galleryLoading: boolean;
  userGalleryLoading: boolean;
}

const initialState: galleryState = {
  gallery: [],
  userGallery: [],

  galleryLoading: false,
  userGalleryLoading: false,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state: galleryState) => {
      state.galleryLoading = true;
    });
    builder.addCase(fetchGallery.fulfilled, (state: galleryState, {payload : galleries}) => {
      state.gallery = galleries;
      state.galleryLoading = false;
    });
    builder.addCase(fetchGallery.rejected, (state: galleryState) => {
      state.galleryLoading = false;
    });
    
    builder.addCase(fetchUserGallery.pending, (state: galleryState) => {
      state.userGalleryLoading = true;
    });
    builder.addCase(fetchUserGallery.fulfilled, (state: galleryState, { payload: galleries }) => {
        state.userGallery = galleries;
        state.userGalleryLoading = false;
    });
    builder.addCase(fetchUserGallery.rejected, (state: galleryState) => {
      state.userGalleryLoading = false;
    });
    
  },
})

export const galleryReducer = gallerySlice.reducer;

export const selectGalleries = (state: RootState) => state.gallery.gallery;
export const selectUserGalleries = (state: RootState) => state.gallery.userGallery;

export const selectLoadingGalleries = (state: RootState) => state.gallery.galleryLoading;
export const selectLoadingUserGalleries = (state: RootState) => state.gallery.userGalleryLoading;

