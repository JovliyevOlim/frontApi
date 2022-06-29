import {configureStore} from "@reduxjs/toolkit";
import {api} from "./Api/middleware";
import ProductReducer from "./Home/Product/ProductReducer";
import CategoryReducer from "./Home/Product/CategoryReducer";
export default configureStore({
    reducer:{ProductReducer,CategoryReducer},
    middleware:[api]
})