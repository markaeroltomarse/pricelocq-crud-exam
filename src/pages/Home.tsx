import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

import { AdminLayout } from 'src/components/Layout';
import { PostList, PostListFilter } from 'src/components/PostList';
import { usePostHook } from 'src/hooks';
import useFeedbackState from 'src/hooks/useFeedbackState';
import { urlFormatter } from 'src/utils/string';

export interface HomeProps { }


export const Home: React.FC<HomeProps> = () => {
	const navigate = useNavigate()
	const { handleSetIsPostModalOpen } = useFeedbackState()

	const {
		handleOnSearchPost,
		handleSetDeletePost,
		filteredPosts,
		search,
		postsData,
		handleDeleteMultiple,
		handleOnChangeSelectAll,
		getPostsApiState: {
			isLoading: getPostsApiStateIsLoading
		},
		deleteMultipleIsLoading,
		selectedPosts, handleSetSelectedPosts,
		handleSetEditPost
	} = usePostHook()

	return (
		<AdminLayout>
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
					gap={1}
					sx={{
						flexDirection: {
							xs: 'column',
							md: 'row'
						},
					}}
				>
					<Typography fontWeight={'bold'} variant='h6' >
						Posts
					</Typography>
					<PostListFilter
						onSearch={handleOnSearchPost}
						onClickAdd={() => {
							handleSetIsPostModalOpen(true)
						}}
					/>
				</Box>
				<Divider />
				<Box padding={'2em'}>
					<PostList
						posts={filteredPosts}
						loadingSkeleton={getPostsApiStateIsLoading}
						selectedPosts={selectedPosts}
						totalPostsCount={search ? filteredPosts.length : postsData.length}
						onClickDelete={handleSetDeletePost}
						onClickView={(post) => {
							navigate(`/post/${urlFormatter(post.title)}`)
						}}
						onClickEdit={handleSetEditPost}
						onDeleteMultiple={handleDeleteMultiple}
						onChangeSelectedPosts={handleSetSelectedPosts}
						deleteMultipleIsLoading={deleteMultipleIsLoading}
						onChangeSelectAll={handleOnChangeSelectAll}
					/>
				</Box>
			</Card>
		</AdminLayout>
	);
};
