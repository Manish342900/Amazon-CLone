import React, { useEffect, useState } from 'react';
import "./amazon.css";
import Checkmark from "../../images/icons/checkmark.png";
import { useCart } from '../cart';
import StarRating from './Rating';
import { useInput } from '../Header/Input';

export default function Index() {
  const [products, setProducts] = useState([]);
  const { cartItems, updateCart } = useCart();
  const [selectedValue, setSelectedValue] = useState({});
  const { input, updateInput } = useInput();
  const [filter, setFilter] = useState([]);

  // Handle quantity change for each product
  const handleChange = (event, Id) => {
    const value = event.target.value;
    setSelectedValue((prev) => ({
      ...prev,
      [Id]: { value: value }
    }));
  };

  // Fetch products from the API
  async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProducts(data.products);
  }

  // Add product to the cart
  function addToCart(product) {
    const selectedQuantity = selectedValue[product.id]?.value || 1;
    let matchingItem = cartItems.find(item => item.value.id === product.id);

    if (matchingItem) {
      matchingItem.quantity += Number(selectedQuantity);
      updateCart([...cartItems]);
    } else {
      updateCart(prevCart => [
        ...prevCart,
        { value: product, quantity: Number(selectedQuantity), deliveryOption: 0 }
      ]);
    }
  }

  // Filter products based on the input
  useEffect(() => {
    const filteredProducts = products.filter((item) => 
      item.title.toLowerCase().startsWith(input)
    );
    setFilter(filteredProducts);
  }, [input, products]); 

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const displayedProducts = input ? filter : products; 

  return (
    <div className='main'>
      <div className='products-grid'>
        {displayedProducts.length ? displayedProducts.map((product) => (
          <div key={product.id}>
            <div className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.images[0]} alt={product.title} />
              </div>

              <div className="product-name limit-text-to-2-lines">
                {product.title}
              </div>

              <div className="product-rating-container">
                <StarRating rating={product.rating} />
              </div>

              <div className="product-price">
                {`$ ${product.price}`}
              </div>

              <div className="product-quantity-container">
                <select
                  id={product.id}
                  value={selectedValue[product.id]?.value || "1"}
                  onChange={(e) => handleChange(e, product.id)}
                >
                  {[...Array(10).keys()].map(i => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart">
                <img src={Checkmark} alt={product.title} />
                Added
              </div>

              <button onClick={() => addToCart(product)} className="add-to-cart-button button-primary">
                Add to Cart
              </button>
            </div>
          </div>
        )) : (
          <p>No products found.</p> // If no products match the filter
        )}
      </div>
    </div>
  );
}
