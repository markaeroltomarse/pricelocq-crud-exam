import { Box, Modal, Switch, Typography } from '@mui/material';
import React from 'react';
import { TSetting } from 'src/types/Feedback';
export interface SettingModalProps {
    open: boolean
    handleOnClose?: () => void
    onChange?: (setting: TSetting) => void
    initialData?: TSetting
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

const SettingModal: React.FC<SettingModalProps> = (props) => {
    const { open, handleOnClose, initialData, onChange } = props;

    return <Modal
        keepMounted
        open={open}
        onClose={handleOnClose}
        aria-labelledby="setting-modal-title"
        aria-describedby="setting-modal-description"
    >
        <Box sx={style}>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography variant='subtitle1'>
                    Transition
                </Typography>

                <Switch
                    onChange={(e) =>
                        onChange?.({
                            ...initialData,
                            transition: e.target.checked,
                            open
                        })}
                    title='Transition'
                    checked={initialData?.transition} />
            </Box>
        </Box>
    </Modal>
};

export default SettingModal;
