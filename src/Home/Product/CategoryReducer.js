import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../Api/api";

const slice = createSlice({
    name: 'category',
    initialState:{
        category:[]
    },
    reducers: {
        getcategory: (state, action) => {
            state.category = action.payload
        }
    }
});

export const GetCategory=()=>apiCall({
    url: '/category',
    method: 'get',
    onSuccess: slice.actions.getcategory.type
})

export default slice.reducer