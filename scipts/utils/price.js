import { cart } from "../../data/cart.js";
import { getproduct } from "../../data/products.js";
import { delivery } from "../../data/delivery.js";
export function decimal(priceCents){
    return (priceCents/100).toFixed(2);
    
}

export function price(){
    let productprice=0
    let shippingprice=0
    let shipprice;
    cart.forEach((element) => {
        let product=getproduct(element.productID);
        productprice+=product.priceCents*element.quantity; 
        
    });

    cart.forEach((elem)=>{
        let ID=elem.deliveryOptionId;
        delivery.forEach((option)=>{
            if(option.id===ID){
                shipprice=option
            }
        })
        shippingprice+=shipprice.priceCents;
    })
    let beforetax=productprice+shippingprice;
    let aftertax=beforetax*0.1;
    let Totalprice=productprice+shippingprice+aftertax;

    return Totalprice;
}

