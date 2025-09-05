// ==================== Display Cart ====================
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartBody = document.getElementById("cartBody");
  let cartCount = document.getElementById("cartCount");
  let subTotalEl = document.getElementById("subTotal");

  cartBody.innerHTML = "";
  let subTotal = 0;

  cart.forEach((item, index) => {
    let qty = item.qty || 1;
    let price = item.price;
    let total = price * qty;
    subTotal += total;

    let sizeOptions = "";
    if (item.category !== "electronics") {
      sizeOptions = `
        <select class="form-select" id="size-${index}" onchange="updateSize(${index})">
          <option value="S" ${item.size === "S" ? "selected" : ""}>S</option>
          <option value="M" ${item.size === "M" ? "selected" : ""}>M</option>
          <option value="L" ${item.size === "L" ? "selected" : ""}>L</option>
          <option value="XL" ${item.size === "XL" ? "selected" : ""}>XL</option>
        </select>
      `;
    }

    let row = `
      <tr class="align-top">
        <td>
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.image}" class="img-fluid rounded-start h-100" alt="${item.title}" />
              </div>
              <div class="col-md-8">
                <div class="card-body d-block flex-column">
                  <h5 class="card-title ">${item.title}</h5>
                  <p class="text-muted">Category: <span class="text-dark fw-semibold">${item.category}</span></p>
                  ${sizeOptions}
                  <div class="container-fluid d-flex justify-content-between mx-0 px-0">
                    <p class="text-muted my-0">Price: <span class="text-dark fw-semibold">${price}$</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td>
          <input type="number" id="qty-${index}" class="form-control" value="${qty}" min="1" 
                 oninput="updateItem(${index}, this.value)" />
        </td>
        <td>
          <span class="text-dark fw-semibold" id="total-${index}">${total.toFixed(2)}$</span>
        </td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-danger px-3" onclick="removeItem(${index})">Delete</button>
          </div>
        </td>
      </tr>
    `;
    cartBody.innerHTML += row;
  });

  cartCount.textContent = `You have ${cart.length} product(s) in your cart`;
  subTotalEl.textContent = subTotal.toFixed(2) + "$";

  // ==================== Delivery Date ====================
  let today = new Date();
  today.setDate(today.getDate() + 3);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let deliveryDate = today.toLocaleDateString("en-US", options);

  document.getElementById("delivery-date").textContent = deliveryDate;
}

// ==================== Update Size ====================
function updateSize(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let selectedSize = document.getElementById(`size-${index}`).value;
  cart[index].size = selectedSize;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ==================== Update Item ====================
function updateItem(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let qty = parseInt(newQty);
  if (qty < 1 || isNaN(qty)) qty = 1;

  cart[index].qty = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ==================== Remove Item ====================
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ==================== Add To Cart ====================
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-add-to-cart");
  if (!btn) return;

  let productId = parseInt(btn.dataset.id);
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let product = products.find((p) => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find((p) => p.id === productId);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1, size: "S" }); // default size
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Update Cart
});

// ==================== Window onload ====================
window.onload = function () {
  displayCart();
};
