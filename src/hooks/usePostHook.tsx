import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPostMutation, useDeletePostMutation, useLazyGetPostQuery, useLazyGetPostsQuery, useUpdatePostMutation } from "src/store/api/postApi";
import { addPost, setDeletePost, setEditPost, setPosts, setSelectedPosts, updatePost } from "src/store/reducers/postsReducer";
import { TPost } from "src/types";
import { useAppDispatch, useAppSelector, useFeedbackState } from ".";

export interface usePostHookProps {

}

const usePostHook = (props?: usePostHookProps) => {
    const dispatch = useAppDispatch()
    const { postId } = useParams()
    const navigate = useNavigate()
    const { posts: postsData, selectedPosts, editPost, deletePost } = useAppSelector((store) => store.postsReducer)

    const [search, setSearch] = useState('')
    const [deleteMultipleIsLoading, setDeleteMultipleIsLoading] = useState(false)

    const [getPostsApi, getPostsApiState] = useLazyGetPostsQuery()
    const [createNewPostApi, createNewPostApiState] = useAddPostMutation()
    const [deletePostApi, deletePostApiState] = useDeletePostMutation()
    const [getPostApi, getPostApiState] = useLazyGetPostQuery()
    const [updatePostApi, updatePostApiState] = useUpdatePostMutation()

    const {
        executeSnackbar,
        handleSetIsPostModalOpen
    } = useFeedbackState()

    const handleOnSearchPost = (searchTxt: string) => {
        setSearch(searchTxt)
    }

    const handleSavePost = async (newPost: TPost) => {
        let res
        if (editPost) {
            res = await updatePostApi({ ...newPost, id: editPost?.id, })
        } else {
            res = await createNewPostApi(newPost)
        }

        const { data: postData, error } = res

        if (error) {
            return executeSnackbar({
                message: JSON.stringify(error)
            })
        }

        dispatch(editPost ? updatePost(postData) : addPost(postData))
        executeSnackbar({
            message: `New post added "${newPost.title}" successfully.`
        })
        handleSetIsPostModalOpen(false)
    }

    const handleGetPostsApi = async () => {
        const { data } = await getPostsApi(undefined)
        dispatch(setPosts(data))
    }

    const handleDeletePostApi = async () => {
        if (!deletePost) {
            return executeSnackbar({
                message: 'Cannot delete post.'
            })
        }

        const { error } = await deletePostApi({ postId: deletePost.id! })

        if (error) {
            return executeSnackbar({
                message: JSON.stringify(error)
            })
        }

        if (postId) {
            navigate('/')
        }

        dispatch(setPosts(postsData.filter(post => post.id !== deletePost.id)))
        executeSnackbar({
            message: `Post "${deletePost.title}" successfully deleted .`
        })
        dispatch(setDeletePost(null))
    }

    const handleOnChangeSelectAll = (isChecked: boolean) => {
        handleSetSelectedPosts(isChecked ? postsData.map(post => post.id!) : [])
    }

    const handleDeleteMultiple = async (postIds: number[]) => {
        setDeleteMultipleIsLoading(true)
        await Promise.all(postIds.map(id => deletePostApi({ postId: id })))
        dispatch(setPosts(postsData.filter(post => !postIds.includes(post.id!))))
        handleSetSelectedPosts([])
        setDeleteMultipleIsLoading(false)
        executeSnackbar({
            message: "Multiple posts deleted successfully."
        })
    }

    const handleSetSelectedPosts = (postIds: number[]) => dispatch(setSelectedPosts(postIds))

    const handleSetEditPost = (post?: TPost | null) => {
        dispatch(setEditPost(post))
        if (post) { handleSetIsPostModalOpen(true) }
    }

    const handleGetPostApi = async (postId: number) => {
        const { data } = await getPostApi({ postId })
        return data
    }

    const filteredPosts = useMemo(() => {
        if (!postsData) return []

        if (search) {
            return postsData.filter((post: TPost) => post.title.includes(search) || post.body.includes(search))
        } else {
            return postsData
        }
    }, [search, postsData])

    const handleSetDeletePost = (post?: TPost | null) => dispatch(setDeletePost(post))

    return {
        search, setSearch,
        selectedPosts,
        deletePost, handleSetDeletePost,
        postsData,
        filteredPosts,
        createNewPostApiState,
        deletePostApiState,
        deleteMultipleIsLoading,
        getPostApiState,
        editPost,
        updatePostApiState,
        getPostsApiState,
        handleOnSearchPost,
        handleSavePost,
        handleGetPostsApi,
        handleDeletePostApi,
        handleDeleteMultiple,
        handleSetSelectedPosts,
        handleOnChangeSelectAll,
        handleGetPostApi,
        handleSetEditPost,
    }
};

export default usePostHook;
