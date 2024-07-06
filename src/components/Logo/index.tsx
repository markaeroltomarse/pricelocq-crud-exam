import { Box, Typography } from '@mui/material';
import React from 'react';
export interface MockLogoProps {

}

const MockLogo: React.FC<MockLogoProps> = () => {
    return <Box sx={{
        backgroundColor: '#f1c40f',
        border: '2px solid #273c75',
        borderRadius: '100%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }}>
        <Typography variant='caption' fontWeight={'bold'}>
            LOGO
        </Typography>
    </Box>
};

export default MockLogo;
