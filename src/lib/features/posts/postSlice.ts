import {createSlice} from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: {
            posts:{
                data: [],
                current_page: 1,
                total: 0,
            },
            friends:[]
        },
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
})

export const {setPosts} = postSlice.actions;
export default postSlice.reducer;