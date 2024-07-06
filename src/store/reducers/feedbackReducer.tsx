import { createSlice } from '@reduxjs/toolkit';
import { TSetting, TSnackbar } from 'src/types/Feedback';

interface IInitialState {
    snackbar: TSnackbar | null
    setting: TSetting
    isPostModalOpen: boolean
}

const initialState: IInitialState = {
    snackbar: null,
    setting: {
        open: false,
        transition: true,
        postTableViewMode: 'list'
    },
    isPostModalOpen: false
};

const feedbackReducer = createSlice({
    name: 'feedbackReducer',
    initialState,
    reducers: {
        setSnackbar(state, { payload }) {
            state.snackbar = payload;
        },
        setSetting(state, { payload }) {
            state.setting = payload
        },
        setIsPostModalOpen(state, { payload }) {
            state.isPostModalOpen = payload
        }
    },
});

export const { setSnackbar, setSetting, setIsPostModalOpen } = feedbackReducer.actions;
export default feedbackReducer.reducer;
