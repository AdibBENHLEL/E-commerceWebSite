import React, { useState, useEffect } from 'react';
import ProductDetails from './components/product';
import './home.css';
import logo from '../../assets/logo.png';
import { FaShoppingCart } from 'react-icons/fa'; // Import shopping cart icon
import { Link } from "react-router-dom";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5500/products');
        const data = await response.json();
        setProducts(data); // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="total-container">
      {/* Header Section */}
      <div className="header">
        <img src={logo} alt="E-Market Logo" className="logo" />
        <h1>Jibelna Zimni E-Market</h1>
        <div className="cart">
          <FaShoppingCart size={30} />
          <span className="cart-counter">Cart: {cart.length}</span>
        </div>
        <div className="auth-buttons">
          <Link to="/auth"><button>Login</button></Link>
        </div>
      </div>

      {/* Product Section */}
      <div className="main">
        <h2>Our Products</h2>
        <div className="product-container">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductDetails key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        {/* Cart List Section */}
        {cart.length > 0 && (
          <div className="cart-list">
            <h3>Products in Cart</h3>
            <ul>
              {cart.map((product, index) => (
                <li key={index}>
                  <img src={product.image} alt={product.name} width={50} />
                  <span>{product.name}</span> - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>



      {/* Footer Section */}
      <div className="footer">
        <p>&copy; 2024 E-Commerce. All rights reserved. ABH</p>
      </div>
    </div>
  );
};

export default Home;
