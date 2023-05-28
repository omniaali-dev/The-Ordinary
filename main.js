const prdouctsSec = document.querySelector(".products-sec");
const cartIcon = document.querySelector(".cart1");
const cartItems = document.querySelector(".card-group");
const subtotal = document.querySelector(".subtotal");
// const totalItemsInCart = document.querySelector(".numberItems");
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
let btnn = document.querySelector(".btnn");
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
function addToCart(id) {
  //check if product is on cart aleardy 
  if (cart.some((item) => item.id === id)) { //the item that i clicked on has the same id as the one already in the cart
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);   
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  sideBar.classList.add("show");
  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubtotal();
  // totalItemsInCart.style.display = "block";
  //save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subtotal.innerHTML = `Subtotal (${totalItems} items):$${totalPrice.toFixed(
    2
  )}`;
}


function renderCartItems() {
  cartItems.innerHTML = ""; //clear cart elements
  cart.forEach((item) => {
    cartItems.innerHTML += `
   <div class="card" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4" style="height:15rem">
      <img style="height:100%;width:100%" src="${item.image}" class="img-fluid rounded-start" alt="...">
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
//change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
//remove items from cart
function removeItemsFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}
let flkty = new Flickity(prdouctsSec, {
  // options
  cellAlign: "left",
  groupCells: "80%",
  contain: true,
  resize: true,

});
