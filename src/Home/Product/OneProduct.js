import React, {useState} from 'react';
import {connect} from "react-redux";
import ProductReducer,{GetProductOne} from "./ProductReducer";
import {Modal} from "reactstrap";
import {useEffect} from "react";

function OneProduct({match,GetProductOne,ProductReducer}) {

    useEffect(()=>{
        console.log(match)
        GetProductOne(match.params.id)
    },[])

    useEffect(()=>{
        getkey()
    },[ProductReducer.current])

    const [active,setactive] = useState(false)
    const [url,seturl] = useState('')
    function toggle(url){
            setactive(!active)
        seturl(url)
    }
     const [one,setone]=useState([])
   async function getkey(){
        let keys = Object.entries(ProductReducer.productone[0])
        console.log(keys)
        setone(keys)
    }
    return (
        <div className={'pt-5'}>
            {
                ProductReducer.productone.map(item=> <div className={'d-flex align-items-center'}>
                    <div className={'col-5'}>

                       <div className={"d-flex justify-content-center"}>
                           <img onClick={()=>toggle(item.thumbnail)} className={'img-fluid cursor-pointer'} style={{width:"450px"}} src={item.thumbnail} alt={item.title}/>
                       </div>
                        <div>
                            <div  className={'d-flex justify-content-around m-2'}>
                                {
                                    item.images.map((items,index)=>
                                        <img onClick={()=>toggle(item.images[index])} className={'img-fluid cursor-pointer'} style={{width:"100px"}} src={item.images[index]} alt={item.title}/>
                                    )
                                }
                            </div>
                        </div>


                    </div>
                        <div className="col-6 offset-1">
                                {
                                    one.map((item,index)=>
                                        {
                                            if (one[index][0] !== 'id' && one[index][0] !== 'thumbnail' && one[index][0] !== 'images'){
                                                return   <div className={'d-flex mb-2'}>
                                                    <h5 className={'align-items-center text-start text-white me-3 text-capitalize'}>{one[index][0]}:</h5>
                                                    <p className={'align-items-center p-0 text-white'}>{one[index][1]}</p>
                                                </div>
                                            }
                                        }

                                    )
                                }
                        </div>


                </div>)
            }
            <div>
                <Modal isOpen={active} toggle={toggle} className={'pt-5'}>
                    <div>
                        <img src={url} style={{width:'600px',height:'100%'} } alt=""/>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default connect(ProductReducer,{GetProductOne}) (OneProduct);