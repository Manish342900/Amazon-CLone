export let cart=JSON.parse(localStorage.getItem('cart',))

 if(!cart){
    cart=[{
        productID:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:'1'
     },{
        productID:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'2'

     }]
 }
 
 
function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productID){
            matchingItem=item;
        }      
    })
    if(matchingItem){
        matchingItem.quantity++;
    }else{
        cart.push({
            productID:productId,
            quantity:1,
            deliveryOptionId:'1'

        })
    }
    savetostorage()
}

export function removefromCart(productId){
    const newcart=[]
    cart.forEach((cartitem)=>{
        if(cartitem.productID!==productId){
            newcart.push(cartitem);
        }
    })
    cart=newcart;
    
    savetostorage()
}

export function updatedeliveryoption(productId,deliveryoptionId){
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productID){
            matchingItem=item;
        }      
    })
    matchingItem.deliveryOptionId=deliveryoptionId;
    savetostorage()
}

export function updateCartQuantity(parameter){
    let cartQuantity=0
    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
    })
    document.querySelector(`.${parameter}`).innerHTML=`${cartQuantity}`;  
    savetostorage()
   
}




