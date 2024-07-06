import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TPost } from 'src/types';

export interface PostModalProps {
    open: boolean;
    handleClose: () => void;
    initialData?: TPost | null;
    handleSave: (data: { userId: number; title: string; body: string }) => void;
    loading?: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

const PostModal: React.FC<PostModalProps> = ({ open, handleClose, initialData, handleSave, loading }) => {
    const [userId, setUserId] = useState(initialData?.userId || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [body, setBody] = useState(initialData?.body || '');

    const handleSubmit = () => {
        handleSave({ userId: Number(userId), title, body });
    };

    const handleOnClose = () => {
        setBody('')
        setTitle('')
        setUserId('')
        handleClose?.()
    }

    useEffect(() => {
        if (initialData) {
            setUserId(initialData.userId)
            setTitle(initialData.title)
            setBody(initialData.body)
        }
    }, [initialData])

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleOnClose}
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
        >
            <Box sx={style}>
                <Typography id="post-modal-title" variant="h6" component="h2">
                    {initialData ? 'Edit Post' : 'Create Post'}
                </Typography>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="User ID"
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                    <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                            <Button onClick={handleOnClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button disabled={loading} type='submit' variant="contained" color="primary">
                                Save {loading && <CircularProgress color='inherit' size={14} />}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};

export default PostModal;
