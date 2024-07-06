import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, Button, Divider, TextField } from '@mui/material';
import React from 'react';
export interface PostListFilterProps {
    onSearch?: (searchTxt: string) => void
    onClickAdd?: () => void
}


const PostListFilter: React.FC<PostListFilterProps> = (props) => {
    const { onSearch, onClickAdd } = props
    return <Box
        sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
        <TextField
            label="Search"
            variant="outlined"
            size="small"
            style={{ color: '#fdcb6e' }}
            onChange={(e) => onSearch?.(e.target.value)}
        />
        <Button
            variant="contained"
            color="primary"
            style={{
                backgroundColor: '#fdcb6e',
                letterSpacing: '1px',
                fontSize: '10px',
                padding: '10px 20px',
                fontWeight: 'bold'
            }}
            onClick={() => onClickAdd?.()}
        >
            <PostAddIcon fontSize={'small'} style={{ color: '#403002' }} />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Divider orientation='vertical' />
                Add new post
            </Box>
        </Button>
    </Box>
};

export default PostListFilter;
