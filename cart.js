const prdouctsSec = document.querySelector(".products-sec");
const cartIcon = document.querySelector(".cart1");
const cartItems = document.querySelector(".card-group");
const subtotal = document.querySelector(".subtotal");
const totalItemsInCart = document.querySelector(".numberItems");
const sideBar = document.querySelector(".offcanvas");
const close = document.querySelector(".btn-close");
close.onclick = () => {
  sideBar.classList.remove("show");
  sideBar.classList.add("hidden");
};
function renderProduct() {
  products.forEach((product) => {
    prdouctsSec.innerHTML += `
 <div class="card1">
  <div class="image">
    <img src="${product.image}" alt="">
  </div>
  <h3>${product.name}</h3>
  <p>${product.description}</p>
  <div class="info">
    <p>${product.size}</p>
    <p>Price:${product.price}$</p>
    <button class="btnn" onclick=addToCart(${product.id})> Add to basket <img  class="cart" src="images/cart-4-svgrepo-com.svg" alt=""></button>
  </div>
</div>
 `;
  });
}


renderProduct();
let cart = [];
updateCart();
function addToCart(id){
if(cart.some((item) => item.id === id)){
    alert('item already in cart');
}
else {
    const item = products.find((product)=>product.id === id);
    cart.push({
        ...item,
        numberOfUnits:1,
    })
}
updateCart();
}


 function updateCart(){
renderCartItems();
// renderSubtotal();
}
function renderCartItems(){
  cartItems.innerHTML = '';
  cart.forEach((item) =>{
     cartItems.innerHTML += `
   <div class="card" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
      <img style="height:100%" src="${item.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
           <p class="card-text">size: ${item.size}</p>
        <p class="card-text">price: ${item.price}$</p>
        <div class="units">
       <div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
        <p class="card-text">${item.numberOfUnits}</p>
       <div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
       <button class="btn btn-primary remove" onclick="removeItemsFromCart(${item.id})">Remove</button>
       </div>
       
      </div>
    </div>
  </div>
</div>
  `;
  });
}

function renderSubtotal (id){
let totalPrice = 0, totalUnits = 0;
cart.forEach(function(item){
    totalPrice += item.price * item.numberOfUnits;
    totalUnits += item.numberOfUnits;
})
  subtotal.innerHTML = `Subtotal (${totalUnits} items):$${totalPrice.toFixed(
    2
  )}`;
}
let flkty = new Flickity(prdouctsSec, {
  // options
  cellAlign: "left",
});