import React, { useEffect, useState } from 'react'
import "./amazon.css"
import Checkmark from "../../images/icons/checkmark.png"
import { useCart } from '../cart'
import StarRating from './Rating'

export default function Index() {
  const [products, setProducts] = useState([]);
  const { cartItems, updateCart } = useCart();
  const [selectedValue, setSelectedValue] = useState({});

  const handleChange = (event, Id) => {
    const value = event.target.value;
    setSelectedValue((prev) => ({
      ...prev,
      [Id]: { value: value }
    }));
  };

  async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log(data);
    setProducts(data.products);
  }

  function addToCart(product) {
    const selectedQuantity = selectedValue[product.id]?.value || 1; // Default to 1 if no quantity is selected

    let matchingItem = cartItems.find(item => item.value.id === product.id);

    if (matchingItem) {
      matchingItem.quantity += Number(selectedQuantity);
      updateCart([...cartItems]);  // Update the cart with the modified quantity
    } else {
      updateCart(prevCart => [
        ...prevCart,
        { value: product, quantity: Number(selectedQuantity), deliveryOption: 0 }
      ]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='main'>
      <div className='products-grid'>
        {
          products && products.length ?
            products.map((product) =>
              <div key={product.id}>
                <div className="product-container">
                  <div className="product-image-container">
                    <img className="product-image" src={product.images} alt={product.title} />
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
                      value={selectedValue[product.id]?.value || "1"} // Default to 1 if no value is selected
                      onChange={(e) => handleChange(e, product.id)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
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
            ) : <div>No products</div>
        }
      </div>
    </div>
  );
}
