let carts=document.querySelectorAll('.shop-item-button');

let Products=[

    {

        name:'Sherlock Holmes',
        tag:'SherlockHolmes',
        price:'400',
        inCart:0
    },

    {

        name:'The Girl in Room 105',
        tag:'TheGirlinRoom105',
        price:'185',
        inCart:0
    },

    {

        name:'All the light we cannot see',
        tag:'Allthelightwecannotsee',
        price:'150',
        inCart:0
    },

   

    {

        name:'Crystal Magic',
        tag:'CrystalMagic',
        price:'250',
        inCart:0
    },

    {

        name:'Brain in a Jar',
        tag:'BraininaJar',
        price:'350',
        inCart:0
    },

    {

        name:'Freedom Boker',
        tag:'FreedomBoker',
        price:'550',
        inCart:0
    },

    {

        name:'Human Action',
        tag:'HumanAction',
        price:'100',
        inCart:0
    },
    {

        name:'Bill gates',
        tag:'Billgates',
        price:'160',
        inCart:0
    },
    {

        name:'Heldi',
        tag:'Heldi',
        price:'199',
        inCart:0
    },
    {

        name:'Great Expectation',
        tag:'GreatExpectation',
        price:'150',
        inCart:0
    },
    {

        name:'Missing',
        tag:'missing',
        price:'40',
        inCart:0
    },

]



let all=localStorage.setItem("Products",JSON.stringify(Products));


for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(Products[i]);
        totalcost(Products[i]);
      
    })

}




function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
if(productNumbers){
    document.querySelector('.cart-items').textContent=productNumbers;

}

}

function cartNumbers(Products){
    let productNumbers=localStorage.getItem('cartNumbers');

    productNumbers=parseInt(productNumbers);

    

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        
       displaycount();

    }
    else{
        localStorage.setItem('cartNumbers',1);
document.querySelector('.cart-items').textContent=1;
    }
setItems(Products);
}

function setItems(Products){

    let cartItems=localStorage.getItem('ProductsInCart');
    cartItems=JSON.parse(cartItems);
   if(cartItems!=null){
       if(cartItems[Products.tag]==undefined){
           cartItems={
               ...cartItems,
               [Products.tag]:Products
           }
       }
       cartItems[Products.tag].inCart+=1;
   }
else{
    Products.inCart=1;

    cartItems={
       [Products.tag]:Products
   }
}
   
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems));
}



function totalcost(Products){

    //console.log("product price ",Products.price);
let cartcost=localStorage.getItem("totalcost");

if(cartcost!=null){
    cartcost=parseInt(cartcost);
Products.price=parseInt(Products.price);
    localStorage.setItem("totalcost",cartcost+Products.price);

}else{
    localStorage.setItem("totalcost",Products.price);
}

}





function displaycart(){
let cartItems=localStorage.getItem("ProductsInCart");
cartItems=JSON.parse(cartItems);
//console.log(cartItems);

let productContainer=document.querySelector('.products');
let cartcost=localStorage.getItem("totalcost");


if(cartItems && productContainer ){


    productContainer.innerHTML='';
    
    Object.values(cartItems).map(item=>{
       
        productContainer.innerHTML += `
        <div class="cart-row">
        <div class=" cart-item cart-column">
       <img class="cart-item-image" src="img/${item.tag}.jpg" width="100" height="100">
          
           
       
             <span class="cart-item-title">${item.tag}</span>
            
        </div>

        
          <span class="cart-price cart-column "><i class="fa fa-inr" aria-hidden="true"></i>${item.price}</span>
          <span class="cart-quantity cart-column ">${item.inCart}
          
          <button class="btn btn-danger" type="button" onclick="deleteproduct(event,Products)">&#x2716</button>
          </span>
        
    </div>`
    });


    productContainer.innerHTML+=`
    <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price"><i class="fa fa-inr" aria-hidden="true"></i> ${cartcost}</span>
            </div>

    `
   

}

}


function deleteproduct(event,Products){

    

    event.target.parentElement.parentElement.remove();
    
    let elem = event.target.parentElement.parentElement;
    

    let elemtag=elem.firstElementChild.querySelector('.cart-item-title').textContent;
    

    let localvalue=localStorage.getItem('ProductsInCart');
    localvalue=JSON.parse(localvalue);
   
   Object.values(localvalue).map((item,index)=>{
let tag=item.tag
let incart=item.inCart;


     if(tag==elemtag){
    
      delete localvalue[tag]
     
      
    let cartcount=localStorage.getItem('cartNumbers');
    let cart=cartcount-incart;
    let price=item.price;
    let total=localStorage.getItem('totalcost');
    let final=incart*price;
    var updatedvalue=total-final;
    localStorage.setItem('totalcost',updatedvalue);
   
localStorage.setItem('cartNumbers',cart) 
  
  
   displaycount();
    
     };
    
    })
    
    localStorage.setItem('ProductsInCart', JSON.stringify(localvalue) );
  
location.reload();
}
function displaycount(){

    let count=localStorage.getItem('cartNumbers');
    document.querySelector('.cart-items').textContent=count;
}
function purchaseClicked() {
  
    let cartItems=localStorage.getItem("cartNumbers");
    cartItems=JSON.parse(cartItems);
    if(cartItems==0){
        alert("please buy product");
    }
    else{

    
    window.location.href="form.html";
    }
    


    
}

/*let search = document.getElementById('searchid');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();

    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('shop-item');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("span")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})*/

function searchproduct(){
    var searchbtn=document.getElementById('searchid').value.toUpperCase();
   
   var search=document.getElementsByClassName('shop-item');
   for(var i=0;i<search.length;i++){
       var a=search[i].getElementsByClassName('shop-item-title')[0];
       console.log(a.innerHTML);
       if(a.innerHTML.toUpperCase().indexOf(searchbtn)>-1){
           search[i].style.display="";
       }
       else{
        search[i].style.display="none";
       }
       
   }
    
}

function sortprice(Products){
   let product=localStorage.getItem("Products");
    var shopItems = document.getElementsByClassName('shop-items')[0]

    var button = shopItems.getElementsByClassName('shop-item-price');
    let array=JSON.parse(product)
   
  for(let i=0;i<array.length;i++){
    console.log(array[i]);
  }
    let desc=false;
    let arr=sortby(array,'price',desc);
    desc!=desc;
   
   
   
    

   
}



function sortby(array,sort,desc){
  let sorting=  array.sort(function(a,b){
        if(a[sort]<b[sort]) return -1;
        if(a[sort]<b[sort]) return 1;
        return 0;
    });
  console.log(sorting);
}


/*function displaypro(array){
    
    let final=JSON.stringify(array);
    

    let productContainer=document.querySelector('.shop-items');
    
    let switching=true;
    
    if(!productContainer){
        productContainer.innerHTML='';
        
        Object.values(final).map(item=>{
           
            productContainer.innerHTML += `
            
            `
           
    
       
            
          
       
        });
    }
    
    
       
       
    
    
    
    


}
*/



onLoadCartNumbers();
displaycart();
