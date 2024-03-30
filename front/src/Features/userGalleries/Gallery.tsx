import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGallery } from "./galleryThunks";
import { selectGalleries, selectLoadingGalleries } from "./gallerySlice";
import { CircularProgress, Grid } from "@mui/material";
import GalleryItem from "./GalleryItem";

const Gallery = () => {
  const dispatch = useAppDispatch();

  const gallery = useAppSelector(selectGalleries);
  const onLoading = useAppSelector(selectLoadingGalleries);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch])

  const galleryContainer: JSX.Element[] = gallery.map((item) => (
    <GalleryItem key={item._id} userPicture={item}/>
  )) 

  if (onLoading) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>;
  }

  return (
    <>
    <Grid component='div' sx={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap', 
      gap: '10px', mt: 2
    }}>
      {galleryContainer}
    </Grid>
    </>
  )
};

export default Gallery;