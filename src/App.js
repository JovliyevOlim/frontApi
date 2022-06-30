import logo from './logo.svg';
import './App.css';
import {Route,Switch} from "react-router-dom";
import Products from "./Home/Product/Products";
import OneProduct from "./Home/Product/OneProduct";
import Redirect from "react-router-dom/es/Redirect";
import NOTFound from "./Home/Product/NOTFound";
import {connect} from "react-redux";
import ProductReducer from "./Home/Product/ProductReducer";
function App({ProductReducer}) {

  return (
    <div className='container'>
        <Switch>
            <Route path={'/product/:id'} component={ProductReducer.activelink === false ?OneProduct:NOTFound}/>
            <Route exact path={'/'} component={Products}/>
            <Route path={'*'} component={NOTFound}/>
            <Redirect to={'*'}/>
        </Switch>
    </div>
  );
}

export default connect(ProductReducer) (App);
