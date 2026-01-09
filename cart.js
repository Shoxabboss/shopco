let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");

function renderCart() {
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

  if (cart[index].qty < 1) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
