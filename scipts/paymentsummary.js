import { cart,updateCartQuantity} from "../data/cart.js"
import { getproduct, products } from "../data/products.js";
import { delivery } from "../data/delivery.js";
import { decimal } from "./utils/price.js";

export let Totalprice;
export function paymentrender(){
    let productprice=0
    let shippingprice=0
    let shipprice;
    cart.forEach((element) => {
        let product=getproduct(element.productID);
        productprice+=product.priceCents*element.quantity; 

        let ID=element.deliveryOptionId;
        delivery.forEach((option)=>{
            if(option.id===ID){
                shipprice=option
            }
        })
        shippingprice+=shipprice.priceCents;
        
    });
   
    updateCartQuantity("itemQuantity");

    let beforetax=productprice+shippingprice;
    let aftertax=beforetax*0.1;
    let Totalprice=productprice+shippingprice+aftertax;

    document.querySelector(".payment-summary-money-1").innerHTML=`$${decimal(productprice)}`;
    document.querySelector(".payment-summary-money-2").innerHTML=`$${decimal(shippingprice)}`;
    document.querySelector(".payment-summary-money-3").innerHTML=`$${decimal(beforetax)}`;
    document.querySelector(".payment-summary-money-4").innerHTML=`$${decimal(aftertax)}`;
    document.querySelector(".payment-summary-money-5").innerHTML=`$${decimal(Totalprice)}`;
    
       
}







