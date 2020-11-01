/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

// The initial state of the container
export const initialState = {
    data: {},
    loading: false,
    error: false,
};

const projectFilesSlice = createSlice({
    name: 'projectFiles',
    initialState,
    reducers: {
        fetch(state) {
            state.loading = true;
            state.error = false;
            state.data = {};
        },
        fetchSuccess(state, action) {
            state.data = action.payload.data;
            state.loading = false;
        },
        fetchFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        moveFile(state, action) {
            const {source, dest} = action.payload;
            state.data.name[dest].children[source] = state.data.name[source]
            delete state?.data?.name[source];
        },
    },
});

export const {name, actions, reducer} = projectFilesSlice;