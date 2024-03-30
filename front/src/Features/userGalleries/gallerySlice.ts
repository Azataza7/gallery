import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Gallery, ValidationError } from "../../types";
import { createPictureGallery, deleteOwnPicture, fetchGallery, fetchUserGallery } from "./galleryThunks";

interface galleryState {
  gallery: Gallery[] | [];
  userGallery: Gallery[] | [];

  creatingPictureError: ValidationError | null;

  galleryLoading: boolean;
  userGalleryLoading: boolean;
  userPictureDeletingLoading: boolean;
  creatingPictureLoading: boolean;
}

const initialState: galleryState = {
  gallery: [],
  userGallery: [],

  creatingPictureError: null,

  galleryLoading: false,
  userGalleryLoading: false,
  userPictureDeletingLoading: false,
  creatingPictureLoading: false,
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
    
    builder.addCase(deleteOwnPicture.pending, (state: galleryState) => {
      state.userPictureDeletingLoading = true;
    });
    builder.addCase(deleteOwnPicture.fulfilled, (state: galleryState) => {
        state.userPictureDeletingLoading = false;
    });
    builder.addCase(deleteOwnPicture.rejected, (state: galleryState) => {
      state.userPictureDeletingLoading = false;
    });

    builder.addCase(createPictureGallery.pending, (state: galleryState) => {
      state.creatingPictureLoading = true;
    });
    builder.addCase(createPictureGallery.fulfilled, (state: galleryState) => {
      state.creatingPictureLoading = false;
    });
    builder.addCase(createPictureGallery.rejected, (state: galleryState, {payload: error}) => {
      state.creatingPictureError = error || null;
      state.creatingPictureLoading = false;
    });
  },
})

export const galleryReducer = gallerySlice.reducer;

export const selectGalleries = (state: RootState) => state.gallery.gallery;
export const selectUserGalleries = (state: RootState) => state.gallery.userGallery;

export const selectCreatingPictureError = (state: RootState) => state.gallery.creatingPictureError;

export const selectLoadingGalleries = (state: RootState) => state.gallery.galleryLoading;
export const selectLoadingUserGalleries = (state: RootState) => state.gallery.userGalleryLoading;
export const selectLoadingDeletePictureGalleries = (state: RootState) => state.gallery.userPictureDeletingLoading;
export const selectLoadingCreatePicture = (state: RootState) => state.gallery.creatingPictureLoading;

