import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoadingUserGalleries, selectUserGalleries } from "./gallerySlice";
import { fetchUserGallery } from "./galleryThunks";
import { useParams } from "react-router-dom";
import { selectUser } from "../users/usersSlice";
import { User } from "../../types";
import { CircularProgress, Grid, Typography } from "@mui/material";
import UserGalleryItem from "./UserGalleryItem";

const UserGallery = () => {
  const dispatch = useAppDispatch();
  const userGallery = useAppSelector(selectUserGalleries);
  const onLoading = useAppSelector(selectLoadingUserGalleries);
  const userId = useParams().id;
  const user: User | null = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserGallery(userId ? userId : ''));
  }, [dispatch, userId]);

   const userGalleryContainer: JSX.Element[] = userGallery.map((userItem) => (
    <UserGalleryItem key={userItem._id} userGallery={userItem}/>
  ))

  if (onLoading || !user) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>;
  }

  return (
    <>
    <Typography variant="h4">
      {userGallery[0].user.displayName}'s Gallery
      </Typography>
    <Grid component="div" sx={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap', 
      justifyContent: 'space-between', gap: '10px', mt: 2}}
      >
      {userGalleryContainer}
    </Grid>
    </>
  );
};

export default UserGallery;
