
let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


function updateCartCount() {
  let totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  if(cartCount) cartCount.innerText = totalQty;
}


function renderCart() {
  if (!cartList || !totalPrice) return; 

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartList.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  totalPrice.innerText = total;
}


function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart.splice(index, 1);
  saveCart();
  renderCart();
}


function addToCart(name, price) {
  let item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderCart();
  alert(name + " added to cart");
}

updateCartCount();
renderCart();


const cartBtn = document.getElementById("cartBtn");
if(cartBtn) {
  cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}
