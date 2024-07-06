import { Box, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector, usePostHook } from 'src/hooks';
import useFeedbackState from 'src/hooks/useFeedbackState';
import { DeleteConfirmationDialog } from '../Dialog';
import { AdminDrawer } from '../Drawer';
import Footer from '../Footer/Footer';
import { PostModal } from '../Modal';
import SettingModal from '../Modal/SettingModal';

export interface AdminLayoutProps {
    children?: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    const { children } = props;
    const { snackbar, setting, isPostModalOpen } = useAppSelector(store => store.feedbackReducer)

    const { handleSetIsOpenSettingModal, handleSetSettingModal, handleSetIsPostModalOpen } = useFeedbackState()

    const {
        handleGetPostsApi,
        deletePost, handleSetDeletePost,
        deletePostApiState: {
            isLoading: deletePostApiStateIsLoading
        },
        createNewPostApiState: {
            isLoading: createNewPostApiIsLoading
        },
        updatePostApiState: {
            isLoading: updatePostApiIsLoading
        },
        editPost,
        handleDeletePostApi,
        handleSetEditPost,
        handleSavePost,
    } = usePostHook()

    useEffect(() => {
        handleGetPostsApi()
    }, [])

    return <Box
        display={'flex'}
        sx={{
            flexDirection: {
                xs: 'column',
                md: 'row'
            }
        }}
        height={'100vh'}
    >
        <Box className={setting?.transition ? `slide-right` : ''}>
            <AdminDrawer />
        </Box>
        <Box
            padding={'1em 2em'}
            flexGrow={1}
            sx={{
                overflowY: 'scroll',
                padding: {
                    md: '1em 2em',
                    xs: '1em 1em'
                }
            }}
            className={setting?.transition ? `slide-left` : ''}
        >
            <Snackbar
                anchorOrigin={{
                    vertical: snackbar?.vertical || 'top',
                    horizontal: snackbar?.horizontal || 'right'
                }}
                open={!!snackbar}
                message={snackbar?.message}
                key={snackbar ? (snackbar?.vertical! + snackbar?.horizontal!) : '0'}
            />

            <DeleteConfirmationDialog
                open={!!deletePost}
                handleClose={() => handleSetDeletePost(null)}
                handleConfirm={() => {
                    handleDeletePostApi?.()
                }}
                postTitle={deletePost?.title || ''}
                loading={deletePostApiStateIsLoading}
            />

            <PostModal
                handleClose={() => {
                    handleSetIsPostModalOpen(false)
                    handleSetEditPost(undefined)
                }}
                open={isPostModalOpen}
                handleSave={handleSavePost}
                loading={createNewPostApiIsLoading || updatePostApiIsLoading}
                initialData={editPost}
            />

            <SettingModal
                open={setting?.open}
                initialData={setting}
                handleOnClose={() => handleSetIsOpenSettingModal(false)}
                onChange={(setting) => {
                    handleSetSettingModal(setting)
                }}
            />
            {children}

            <Footer />
        </Box>
    </Box >
};

export default AdminLayout

