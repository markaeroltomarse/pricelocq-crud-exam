import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

export interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  postTitle: string;
  loading?: boolean
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ open, handleClose, handleConfirm, postTitle, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <DialogTitle id="delete-confirmation-dialog-title">
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-dialog-description">
          Are you sure you want to delete the post titled "{postTitle}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant='contained'
          style={{ display: "flex", gap: 5, alignItems: 'center' }}
          disabled={loading}
        >
          Delete {loading && <CircularProgress color='inherit' size={14} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
