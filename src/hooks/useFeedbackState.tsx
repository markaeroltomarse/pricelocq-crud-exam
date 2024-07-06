import { setIsPostModalOpen, setSetting, setSnackbar } from "src/store/reducers/feedbackReducer";
import { TSetting, TSnackbar } from "src/types/Feedback";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export interface useFeedbackStateProps {

}

const useFeedbackState = (props?: useFeedbackStateProps) => {
    const dispatch = useAppDispatch()
    const { setting } = useAppSelector(store => store.feedbackReducer)
    const executeSnackbar = (snackbarData: TSnackbar) => {
        dispatch(setSnackbar(snackbarData))
        setTimeout(() => {
            dispatch(setSnackbar(null))
        }, 5000)
    }

    const handleSetIsOpenSettingModal = (open: boolean) => dispatch(setSetting({
        ...setting,
        open,
    }))

    const handleSetSettingModal = (setting: Partial<TSetting>) => {
        dispatch(setSetting(setting))
    }

    const handleSetIsPostModalOpen = (open: boolean) => dispatch(setIsPostModalOpen(open))

    return {
        setting,
        executeSnackbar,
        handleSetIsOpenSettingModal,
        handleSetSettingModal,
        handleSetIsPostModalOpen
    }
};

export default useFeedbackState;
