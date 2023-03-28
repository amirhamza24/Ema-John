import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showAll, setShowAll] = useState(false);

    
    const handleShowAll = () => {
        setShowAll(true);
    }

    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    
    const handleAddToCart = (product) => {
        // console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (

        // this code show the all products without "show all" button 
        // <div className='shop-container'>
        //     <div className="products-container">
        //         {
        //             products.map(product => <Product 
        //                 key={product.id}
        //                 product={product}
        //                 handleAddToCart={handleAddToCart}
        //             ></Product>)
        //         }
        //     </div>

        //     <div className="cart-container">
        //         <h4>Order Summary</h4>
        //         <p>Selected Items: {cart.length}</p>
        //     </div>
        // </div>


        // this code show 9 products with "show all" button. if "show all" button clicked then show all products
            <>
                <div className='shop-container'>
                    <div className="products-container">
                        {
                            products.slice(0, showAll ? 76 : 9).map(product => <Product 
                                key={product.id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            ></Product>)
                        }
                    </div>

                    <div className="cart-container">
                        <Cart cart={cart}></Cart>
                    </div>
                </div>

                <span onClick={handleShowAll} className='btn-showAll'>
                    <button  className='btn'>Show All</button>
                </span>
            </>
    );
};

export default Shop;