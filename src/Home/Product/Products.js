import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import ProductReducer, {GetProduct, GetFilterProduct} from "./ProductReducer";
import CategoryReducer, {GetCategory} from "./CategoryReducer";
import {Link, Route, Switch} from "react-router-dom";
import './Product.css'

function Products({GetProduct, ProductReducer, GetCategory, CategoryReducer, GetFilterProduct}) {

    useEffect(() => {
        GetProduct()
        GetCategory()

    }, [])

    useEffect(()=>{
        let page = ProductReducer.count
        setpages(page)
        console.log(pages)
    },[ProductReducer.current])

    const [category, setCategory] = useState('')
    const [search, setsearch] = useState('')

    const [pages,setpages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        const startIndex = (currentPage-1) * 3 - 3;
        const endIndex = startIndex + 3;
        GetFilterProduct({
            name: search,
            category: category,
            offset:startIndex,
            limit: 3
        })
    }
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber) * 3 - 3;
        const endIndex = startIndex + 3;
        GetFilterProduct({
            name: search,
            category: category,
            offset:startIndex,
            limit: 3
        })
    }
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        const startIndex = (currentPage+1) * 3 - 3;
        const endIndex = startIndex + 3;
        GetFilterProduct({
            name: search,
            category: category,
            offset:startIndex,
            limit: 3
        })
    }

    function changeCategory(e) {
        setCategory(e.target.value)
        setCurrentPage(1)
        GetFilterProduct({
            name: search,
            category: e.target.value,
            offset: '',
            limit:3
        })
    }

    function changesearch(e) {
        setsearch(e.target.value)
        setCurrentPage(1)
        GetFilterProduct({
            name: e.target.value,
            category: category,
            offset:'',
            limit:3
        })
    }

    const getPaginationGroup = () => {
        if (pages === 30){
            let start = Math.floor((currentPage - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1);
        }else{
        let start = Math.floor((currentPage - 1) / 3) * 3;
        return new Array(Math.round(pages/3)).fill().map((_, idx) => start + idx + 1);
        }
    };
    return (
        <div className={'product'}>
            <div className={'row d-flex justify-content-around mb-4 align-items-center'}>
                <div className="col-3">
                    <input className={'form-control'} onChange={changesearch} value={search} type="search"
                           placeholder={'Search'}/>
                </div>
                <div className="col-3">
                    <h1 className={'text-center text-white'}>Products</h1>

                </div>
                <div className="col-3">
                    <select className={'form-control'} onChange={changeCategory} value={category}>
                        <option value="">All Products</option>
                        {
                            CategoryReducer.category.map((item, index) =>
                                <option
                                    value={CategoryReducer.category[index]}>{CategoryReducer.category[index]}</option>
                            )
                        }

                    </select>

                </div>
            </div>
            <div className={'d-flex mt-5 justify-content-around'}>
                {
                    ProductReducer.product.slice(0,3).map(item =>
                        <div className={'item col-3'}>
                            <div className={'btnsh'}>
                                <Link to={'/product/'+item.id}>
                                    <img className={'img-fluid images cursor-pointer'} src={item.thumbnail} alt=""/>
                                </Link>
                            </div>
                            <div>
                                <p className={'textimg'}>Title: {item.title}</p>

                            </div>
                            <p className={'textdes'}>Description: {item.description}</p>
                            <div className={'d-flex justify-content-center'}>
                                <Link to={'/product/'+item.id}>
                                    <button className={'btnshow'}>Show more</button>

                                </Link>

                            </div>

                        </div>)
                }
            </div>


            <div className={'d-flex justify-content-center'}>

                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                    disabled={currentPage===1 ? true : false}
                >
                    Prev
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === Math.round(ProductReducer.count/3) ? 'disabled' : ''}`}
                    disabled={currentPage=== Math.round(ProductReducer.count/3) ? true : false}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default connect((ProductReducer, CategoryReducer), {GetProduct, GetCategory, GetFilterProduct})(Products);