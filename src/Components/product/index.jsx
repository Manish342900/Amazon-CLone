import React, { useEffect, useState } from 'react'
import "./amazon.css"
import Checkmark from "../../images/icons/checkmark.png"
import { useCart } from '../cart'
import StarRating from './Rating'


export default function Index() {
  const [products, setProducts] = useState([])
  const { cartItems, updateCart } = useCart()
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = (event,Id) => {
    setSelectedValue((prev)=>[...prev,{Id:Id,value:event.target.value}]);
   
  };

  async function fectchProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    console.log(data)

    setProducts(data.products)
  }

  function addToCart(value) {
    let matchingItem;
    cartItems.forEach((item) => {
      if (value.id === item.value.id) {
        matchingItem = item;
      }
    })
    if (matchingItem) {
      matchingItem.quantity++;
      updateCart([...cartItems])
    } else {
      let quan;
      selectedValue.forEach((item)=>{
        if(value.id===item.Id){
          quan=item.value
        }
      })
      updateCart((previousCartItem) => [...previousCartItem, { value: value, quantity: Number(quan) || 1 , deliveryOption:0 }])
    }
  }

  useEffect(() => {
    fectchProducts()
  }, [])




  return (
    <div className='main'>
      <div className='products-grid'>
        {
          products && products.length ?
            products.map((product) =>
              <div key={product.id}>
                <div className="product-container">
                  <div className="product-image-container">
                    <img className="product-image"
                      src={product.images} alt={product.title} />
                  </div>

                  <div className="product-name limit-text-to-2-lines">
                    {product.title}
                  </div>

                  <div className="product-rating-container">
                    <StarRating rating={product.rating}/>
                  </div>

                  <div className="product-price">
                    {`$  ${product.price}`}
                  </div>

                  <div className="product-quantity-container">
                    <select value={selectedValue} onChange={(e)=>handleChange(e,product.id)}>
                      <option selected value="1">1</option>
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

                  <div className="added-to-cart ">

                    <img src={Checkmark} alt={product.title}/>
                    Added
                  </div>

                  <button onClick={() => addToCart(product)} className="add-to-cart-button button-primary">
                    Add to Cart
                  </button>
                </div>
              </div>)

            : <div>No products</div>
        }
      </div>
    </div>
  )
}
