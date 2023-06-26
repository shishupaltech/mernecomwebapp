import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg';
import Product from "./Product.js";

import './Home.css'
const product = {
    name:"Blue Tshirt",
    price:"₹3000",
    images:[{url:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"}],
    _id:"shishupal"
}

const Home = () => {
  return <Fragment>
        <div className='banner'>
            <p>Welcome to Ecommerse</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href='#container'>
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Product</h2>
        <div className='container' id='container'>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>
    </Fragment>
  
}

export default Home