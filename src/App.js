import logo from './logo.svg';
import './App.css';
import {Route,Switch} from "react-router-dom";
import Products from "./Home/Product/Products";
import OneProduct from "./Home/Product/OneProduct";

function App() {

  return (
    <div className='container'>
        <Switch>
            <Route path={'/product/:id'} component={OneProduct}/>
            <Route path={'/'} component={Products}/>
        </Switch>
    </div>
  );
}

export default App;
