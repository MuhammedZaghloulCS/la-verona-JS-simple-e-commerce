class OrderConfirmation {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    this.orderItemsContainer = document.getElementById("order-items");
    this.orderTotal = document.getElementById("order-total");
    this.total = 0;

    this.renderOrder();

    // Clear the cart after rendering confirmation
    this.clearCart();
  }

  renderOrder() {
    // Clear the table first
    this.orderItemsContainer.innerHTML = "";
    this.total = 0;

    this.cartItems.forEach((item) => {
      const row = document.createElement("tr");

      const qty = item.qty || 1;
      const price = item.price || 0;
      const itemTotal = price * qty;
      this.total += itemTotal;

      row.innerHTML = `
        <td>
          <img src="${item.image || "assets/img/default.png"}" 
               alt="${item.title || "Product"}" 
               class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;">
        </td>
        <td class="text-start">
          <h6 class="mb-1">${item.title || "Unnamed Product"}</h6>
          <small class="text-muted">Category: ${item.category || "-"}</small>
        </td>
        <td>$${price.toFixed(2)}</td>
        <td>${qty}</td>
        <td class="fw-bold">$${itemTotal.toFixed(2)}</td>
      `;

      this.orderItemsContainer.appendChild(row);
    });

    this.updateTotal();
  }

  updateTotal() {
    this.orderTotal.textContent = "$" + this.total.toFixed(2);
  }

  updateItemQuantity(index, newQty) {
    if (this.cartItems[index]) {
      this.cartItems[index].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      this.renderOrder();
    }
  }

  clearCart() {
    localStorage.removeItem("cart");
  }
}

// Initialize order confirmation
document.addEventListener("DOMContentLoaded", () => new OrderConfirmation());
