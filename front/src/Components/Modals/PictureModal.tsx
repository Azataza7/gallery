import React from 'react';
import { Box, Button, Grid, Modal } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { apiURL } from '../../constants';

interface Props {
  open: boolean;
  onClose: () => void;
  picture: string;
}

const PictureModal: React.FC<Props> = ({ open, onClose, picture }) => {
  const style = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)', width: '800px', bgcolor: '#121212',
    border: '2px solid #000', boxShadow: 24, p: 4, color: '#FFF',
    borderRadius: '8px', textAlign: 'center'
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display: 'flex', alignItems: 'center',justifyContent: 'center',}}
    >
      <Box sx={style}>
        <Grid component="div" sx={{ display: "flex", justifyContent: 'center', mt: 2 }}>
          {picture ? <img src={apiURL + '/' + picture} alt='picture' width="100%"/> : 
          <img src='../../assets/react.svg'/>}
        </Grid>
        <Button onClick={handleClose} sx={{position: 'absolute', top: '2%', right: '2%'}}>
          <DisabledByDefaultIcon/>
        </Button>
      </Box>
    </Modal>
  );
};

export default PictureModal;
