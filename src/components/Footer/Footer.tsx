import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import MUILogo from '../../assets/mui-logo.png'; // Add the correct path to the logo
import ReactLogo from '../../assets/react-logo.png'; // Add the correct path to the logo
import ReduxLogo from '../../assets/redux-logo.png'; // Add the correct path to the logo
import TypeScriptLogo from '../../assets/typescript-logo.png'; // Add the correct path to the logo

export interface FooterProps {

}

const Footer: React.FC<FooterProps> = (props) => {
    return <Box component="footer" sx={{ padding: '1rem', marginTop: '2rem', color: '#34495e' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">
                © {new Date().getFullYear()} Mark Aerol Tomarse
            </Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <img src={ReactLogo} alt="React Logo" style={{ height: '40px' }} />
                <img src={TypeScriptLogo} alt="TypeScript Logo" style={{ height: '40px' }} />
                <img src={MUILogo} alt="MUI Logo" style={{ height: '40px' }} />
                <img src={ReduxLogo} alt="Redux Logo" style={{ height: '40px' }} />
            </Box>
        </Container>
    </Box>
};

export default Footer;
