import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { postApi } from './api/postApi';
import feedbackReducer from './reducers/feedbackReducer';
import postsReducer from './reducers/postsReducer';
import userReducer from './reducers/userReducer';

const persistedFeedbackReducer = persistReducer(
	{ key: 'feedback', storage: storageSession },
	feedbackReducer
);

const store = () =>
	configureStore({
		reducer: {
			// Apis
			[postApi.reducerPath]: postApi.reducer,

			// Reducers,
			userReducer,
			postsReducer,
			'feedbackReducer': persistedFeedbackReducer
		},
		middleware: (getDefault) =>
			getDefault({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(postApi.middleware),
	});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export default store;
