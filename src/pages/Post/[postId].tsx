import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignpostIcon from '@mui/icons-material/Signpost';
import { Box, Button, Card, Divider, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from 'src/components/Layout';
import { useAppSelector, usePostHook } from 'src/hooks';
import { TPost } from 'src/types';
import { urlFormatter } from 'src/utils/string';
export interface IPostPageProps {

}

const PostPage: React.FC<IPostPageProps> = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState<TPost | null>(null)

    const {
        handleGetPostApi,
        getPostApiState: {
            isLoading
        },
        handleSetDeletePost
    } = usePostHook()

    const postStore = useAppSelector(store => store.postsReducer.posts.find((post) => urlFormatter(post.title) === postId))
    useEffect(() => {
        if (postStore) {
            handleGetPostApi(postStore?.id!)
                .then((post) => {
                    setPost(post)
                })
        }
    }, [postStore, navigate])

    return <AdminLayout>
        <Card
            variant='outlined'
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                width: '100%'
            }}
        >
            <Box
                padding={'1em 2em'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'primary.main'}
            >
                {
                    isLoading && <Skeleton variant="rectangular" width={'100%'} />
                }
                <Box
                    display={isLoading ? 'hidden' : 'flex'}
                    alignItems={'center'}
                    gap={5}
                >
                    <SignpostIcon />
                    <Typography variant='h5'>
                        {post?.title}
                    </Typography>
                </Box>
            </Box>
            <Divider orientation='horizontal' />
            <Box
                padding={'1em 2em'}
                alignItems={'center'}
            >
                {
                    isLoading && <Skeleton variant="rectangular" width={'100%'} height={'20vh'} />
                }
                <Typography paragraph>
                    {post?.body}
                </Typography>
                <Box
                    display={'flex'}
                    justifyContent={'end'}
                    gap={2}
                >
                    <Button onClick={() => navigate(-1)} variant='contained' color='inherit'>
                        <ArrowBackIcon fontSize='small' /> Back
                    </Button>
                    <Button onClick={() => handleSetDeletePost(post)} variant='contained' color='error'>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Card>
    </AdminLayout>
};

export default PostPage;
