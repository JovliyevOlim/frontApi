import React from 'react';
import {connect} from "react-redux";
import ProductReducer from "./ProductReducer";
function NotFound({ProductReducer}) {
    return (
        <div className={'text-center mt-5'}>
            <h2>{ProductReducer.msg}</h2>
            <h2>ERROR 404</h2>
        </div>
    );
}

export default connect(ProductReducer) (NotFound);