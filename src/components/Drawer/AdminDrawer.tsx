import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFeedbackState from 'src/hooks/useFeedbackState';


export interface AdminDrawerProps {

}

const AdminDrawer: React.FC<AdminDrawerProps> = (props: AdminDrawerProps) => {
    const navigate = useNavigate()
    const { handleSetIsOpenSettingModal, } = useFeedbackState()
    return <Box
        boxShadow={'initial'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={'white'}
        justifyContent={'space-between'}
        position={'relative'}
        sx={{
            height: {
                xs: '100px',
                md: '100vh'
            },
            width: {
                xs: '100vw',
                md: '70px'
            },
            flexDirection: {
                xs: 'row',
                md: 'column'
            },
            padding: {
                xs: '0px 1em',
                md: '1em 0px'
            }
        }}
    >
        <Box
            onClick={() => navigate('/')}

            position={'relative'}
            sx={{
                marginY: {
                    xs: '0px',
                    md: '1em'
                },
                borderBottom: {
                    xs: 'none',
                    md: '1px solid grey'
                }
            }}
        >
            <img src="/logo.png" alt="" width={'50px'} style={{ cursor: 'pointer' }} />
        </Box>
        <Box>
            <Tooltip title="Setting">
                <IconButton onClick={() => { handleSetIsOpenSettingModal(true) }}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
};

export default AdminDrawer

