import { configureStore, createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
	name: "requestInfos",
	initialState: {
		fullName: "",
		email: "",
		issueType: "",
		tags: [],
		steps: [],
	},
	reducers: {
		saveInfo: (state, action) => {
			state.fullName = action.payload.fullName;
			state.email = action.payload.email;
			state.issueType = action.payload.issueType;
			state.tags = action.payload.tags;
			state.steps = action.payload.steps;
		},
	},
});

const store = configureStore({
	reducer: {
		requestInfos: infoSlice.reducer,
	},
});

export const { saveInfo } = infoSlice.actions;
export default store;
