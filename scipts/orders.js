import {cart, updateCartQuantity} from "../data/cart.js"
import { getproduct } from "../data/products.js";
import { price } from "./utils/price.js";
import { decimal } from "./utils/price.js";
import { delivery } from "../data/delivery.js";



let orderHTML="";
let innerHTMl='';
let today;
let deliverydate;
let datestring;
let ID;




delivery.forEach((deliveryoption)=>{

  today=dayjs()
  deliverydate=today.add(deliveryoption.time,'days').format('dddd,MMMM D')
  datestring=today.format('MMMM D')
})


cart.forEach((element) => {
    ID=element.productID
    const product=getproduct(ID);
    console.log(ID)

    innerHTMl+=`
    <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                ${deliverydate}
              </div>
              <div class="product-quantity">
                Quantity: ${element.quantity}
              </div>
              
            </div>
            

          `  
});



  orderHTML+= `<div class="order-container"> 
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${datestring}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${decimal(price())}</div>
      </div>
    </div>
    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${ID}</div>
    </div>
  </div>
  <div class="order-details-grid">
  ${innerHTMl} 
</div>`


document.querySelector(".orders-grid").innerHTML=orderHTML;


    