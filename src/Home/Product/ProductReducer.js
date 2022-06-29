import {createSlice, current} from "@reduxjs/toolkit";
import {apiCall} from "../../Api/api";

const slice = createSlice({
    name: 'product',
    initialState:{
        product:[],
        productone:[],
        current:false,
        count:''
    },
    reducers: {
        getproduct: (state, action) => {
                state.product = action.payload.products
                state.count = action.payload.count
            state.current = !state.current

            console.log(action.payload)
            console.log(state.product)
        },
        getproductone: (state, action) => {
            state.productone = []
            state.current = !state.current
            state.productone.push(action.payload)
            console.log(action.payload)
            console.log(state.product)
        }
    }
});

export const GetProduct=()=>apiCall({
    url: '/product',
    method: 'get',
    onSuccess: slice.actions.getproduct.type
})

// GET: main_url/api/product?name=e&category=skincare&limit=10&offset=0
export const GetProductOne=(data)=>apiCall({
    url: '/product/'+data,
    method: 'get',
    onSuccess: slice.actions.getproductone.type
})
export const  GetFilterProduct= (data)=>apiCall({
    url:'/product?name='+data.name+"&category="+data.category+"&limit="+data.limit+"&offset="+data.offset,
     method:'get',
    onSuccess:slice.actions.getproduct.type
})

export default slice.reducer