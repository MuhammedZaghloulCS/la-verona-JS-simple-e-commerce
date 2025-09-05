import { FakeAPI } from "./FakeAPI.js";
import { ProductsCards } from "./ProductsCards.js";
import { Events } from "./MainEvents.js";
import { Product } from "./product.js";
import { Slider } from "./slider.js";

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const badge = document.querySelector(".btn-cart .badge");
  if (badge) {
    badge.textContent = totalQty;
  }
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-add-to-cart");
  if (btn) {
    const productId = parseInt(btn.dataset.id);
    console.log("Add to Cart clicked", productId);
    addToCart(productId);
    updateCartBadge();
  }
});

function addToCart(id) {
  let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  let product = storedProducts.find((p) => p.id === id);
  if (!product) {
    console.error("Product not found in localStorage");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find((p) => p.id === id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();

  const modalBody = document.getElementById("modalBody");
  if (modalBody) {
    modalBody.innerHTML = `
    <div class="alert alert-success mb-0 fw-bold text-center" role="alert">
      ✅ ${product.title} has been added to your cart!
    </div>
  `;
  }

  const cartModalEl = document.getElementById("cartModal");
  if (cartModalEl) {
    const cartModal = new bootstrap.Modal(cartModalEl, {
      backdrop: false,
      keyboard: true,
    });
    cartModal.show();
  }
}

var onlineProducts;
window.onload = async function () {
  var e = new Events();
  const mySlider = new Slider(".slider-container", true, 3000);
  var api = new FakeAPI();

  onlineProducts =
    (await api.getProducts("https://fakestoreapi.com/products")) || [];
  if (onlineProducts.length === 0) {
    console.log("لم يتم تحميل أي منتجات");
    return;
  }
  localStorage.setItem("products", JSON.stringify(onlineProducts));

  let newCard = new ProductsCards();
  onlineProducts.forEach((element) => {
    let product = new Product(element);
    newCard.create(product);
    newCard.addCard();
  });
  setupModal();
  updateCartBadge();
};

export function returnProductsToBeFiltered() {
  return onlineProducts;
}

function setupModal() {
  const modal = document.getElementById("productModal");
  if (!modal) return;

  const closeBtn = document.getElementById("closeModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrice = document.getElementById("modalPrice");
  const modalRate = document.getElementById("modalRate");
  const modalCount = document.getElementById("modalCount");
  const modalDesc = document.getElementById("modalDesc");

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // View button
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-view");
    if (!btn) return;

    const productId = btn.dataset.id;
    const api = new FakeAPI();
    const product = await api.getProducts(
      `https://fakestoreapi.com/products/${productId}`
    );

    if (product) {
      modalImg.src = product.image;
      modalTitle.textContent = product.title;
      modalCategory.textContent = product.category;
      modalPrice.textContent = product.price;
      modalRate.textContent = product.rating?.rate ?? "N/A";
      modalCount.textContent = product.rating?.count ?? "0";
      modalDesc.textContent = product.description;
      const modalAddBtn = modal.querySelector(".btn-add-to-cart");
      if (modalAddBtn) modalAddBtn.dataset.id = product.id;
      modal.style.display = "flex";
    }
  });
}
