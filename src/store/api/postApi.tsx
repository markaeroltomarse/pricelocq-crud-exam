import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TPost } from 'src/types';

const API_URL = 'https://jsonplaceholder.typicode.com'

export const postApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}/posts`,
	}),
	reducerPath: 'postApi',
	tagTypes: ['getPosts', 'getPost'],
	endpoints: (build) => ({
		getPosts: build.query({
			query: () => {
				return {
					url: ``,
					method: 'GET',
				};
			},
			providesTags: ['getPosts'],
		}),
		getPost: build.query({
			query: ({ postId }: { postId: number }) => {
				return {
					url: `/${postId}`,
					method: 'GET',
				};
			},
			providesTags: ['getPost'],
		}),
		addPost: build.mutation({
			query: (newPost: TPost) => {
				return {
					url: ``,
					method: 'POST',
					body: newPost,
				};
			},
		}),
		updatePost: build.mutation({
			query: (newPost: TPost) => {
				return {
					url: `/${newPost.id}`,
					method: 'PUT',
					body: newPost,
				};
			},
		}),
		deletePost: build.mutation({
			query: ({ postId }: { postId: number }) => {
				return {
					url: `/${postId}`,
					method: 'DELETE',
				};
			},
		}),
	}),
});

export const {
	useDeletePostMutation,
	useLazyGetPostsQuery,
	useAddPostMutation,
	useLazyGetPostQuery,
	useUpdatePostMutation,
	util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = postApi;
export const { getPosts, addPost, updatePost, deletePost, getPost } = postApi.endpoints;
