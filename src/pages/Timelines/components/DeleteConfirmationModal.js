import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { deleteTimeline } from '../../../api/data';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 0,
    outline: 0,
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

export default function DeleteConfirmationModal({ openModal, setOpenModal, timelineId, dispatch, state }) {
    const handleClose = () => setOpenModal(false);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ my: 2 }} textAlign='center'>
                        Are you sure you want to delete this timeline?
                    </Typography>
                    <CloseIcon
                        color='primary'
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 15,
                            cursor: 'pointer',
                        }}
                        onClick={handleClose}
                    />
                    <Grid container width='100%'>
                        <Grid item xs={6} display='flex' justifyContent='center'>
                            <Button onClick={() => {
                                deleteTimeline(timelineId)
                                dispatch({ type: 'SET_DATA', payload: state.data.filter(x => x.id !== timelineId) })
                                handleClose()
                            }}>
                                Yes
                            </Button>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='center'>
                            <Button onClick={handleClose}>No</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}