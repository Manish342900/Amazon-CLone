import { cart, removefromCart, updatedeliveryoption,updateCartQuantity} from "../data/cart.js";
import { delivery } from "../data/delivery.js";
import { getproduct } from "../data/products.js";
import { decimal } from "./utils/price.js";
import { paymentrender } from "./paymentsummary.js";


export function rendersummaryorder(){
  let chechoutHtml='';

  cart.forEach((cartItem)=>{
      const productId=cartItem.productID;
      let matchingproduct=getproduct(productId)
      
  
      let devdid=cartItem.deliveryOptionId;
      let deliveryOption;
      delivery.forEach((option)=>{
          if(option.id===devdid){
              deliveryOption=option;
          }
      })
          const today=dayjs()
          const deliverydate=today.add(deliveryOption.time,'days')
          const datestring=deliverydate.format('dddd,MMMM D')
  
      
  
      chechoutHtml+=`<div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
              <div class="delivery-date">
                Delivery date:${datestring}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingproduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-price">
                    $${decimal(matchingproduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${ deliveryHTML(matchingproduct,cartItem)}
                </div>
              </div>
            </div>`
  })
  
  function deliveryHTML(matchingproduct,cartItem){
      let html='';
      delivery.forEach((deliveryoption)=>{
          const pricestring=deliveryoption.priceCents===0?'FREE':`${decimal(deliveryoption.priceCents)}`
          const today=dayjs()
          const deliverydate=today.add(deliveryoption.time,'days')
          const datestring=deliverydate.format('dddd,MMMM D')
          const ischecheck=deliveryoption.id===cartItem.deliveryOptionId;
  
          html+=`<div class="delivery-option" data-product-id="${matchingproduct.id}"data-delivery-option-id="${deliveryoption.id}" >
                    <input type="radio" ${ischecheck?'checked':''}
                      class="delivery-option-input"
                      name="${matchingproduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${datestring}
                      </div>
                      <div class="delivery-option-price">
                        ${pricestring} Shipping
                      </div>
                    </div>
                  </div>`
      })
  return html;
  }
  document.querySelector(".order-summary").innerHTML=chechoutHtml;
  
  document.querySelectorAll(".delete-quantity-link").forEach((button)=>{
      button.addEventListener(("click"),()=>{
          const productId=button.dataset.productId
          removefromCart(productId)
        //   console.log(cart)
          const container=document.querySelector(`.js-cart-item-container-${productId}`)
          container.remove();
          updateCartQuantity(("return-to-home-link"));
          paymentrender();

  
  
      })
  })
  updateCartQuantity("return-to-home-link");


  document.querySelectorAll(".delivery-option").forEach((elem)=>{
      elem.addEventListener("click",()=>{
          const {productId,deliveryOptionId}=elem.dataset
          updatedeliveryoption(productId,deliveryOptionId)
          paymentrender()
          rendersummaryorder();

      })
  })
  // console.log(cart)
  
}

