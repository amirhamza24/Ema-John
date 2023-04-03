import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
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

    useEffect(() => {
        const storedCart = getShoppingCart();
        // console.log(storedCart);

        const savedCart = [];
        // step-1 get id
        for (const id in storedCart) {
            // step-2 get the product by using id
            const addedProduct = products.find(product => product.id === id)
            console.log(addedProduct);

            if(addedProduct) {
                // step-3 add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // step-4 add the add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step-5 set the cart
        setCart(savedCart);
    }, [products])
    
    const handleAddToCart = (product) => {
        // console.log(product);
        let newCart = [];
        // const newCart = [...cart, product];

        // if product does not exist in the cart. then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id)
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