import { createSlice } from '@reduxjs/toolkit';
import { TUser } from 'src/types';

interface IInitialState {
	user: TUser | null;
}

const initialState: IInitialState = {
	user: {
		id: "5e8d8hg8h8h8q8faf8g8f8f",
		name: "John Smith",
		email: "john.smith@welcomedeveloper.com",
		password: "password",
		createdAt: new Date("2020-01-01T00:00:00.000Z").toString(),
		updatedAt: new Date("2020-01-01T00:00:00.000Z").toString(),
		deletedAt: undefined,
		isActive: true,
		isAdmin: false,
		isVerified: true
	}
};

const userSlice = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.user = payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
