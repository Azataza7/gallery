import React, { useState } from 'react';
import { Button, CircularProgress, Menu, MenuItem} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser } from '../../Features/users/usersSlice';
import { logOutUser } from '../../Features/users/usersThunks';
import { User } from '../../types';
import LogOutModal from '../Modals/LogOutModal';

const UserMenu = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector(selectUser);

  if (!user) {
    return <CircularProgress/>
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logOutUser(user.token));
    return navigate('/');
  };


  return (
    <>
      <LogOutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onLogout={logOutHandler}
      />
      <Button color="inherit" onClick={handleClick}>
        {user.displayName}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem component={NavLink} to={`/my-gallery/${user._id}`}>My Gallery</MenuItem>
        <MenuItem component={NavLink} to={`/add-picture`}>Add Picture</MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;