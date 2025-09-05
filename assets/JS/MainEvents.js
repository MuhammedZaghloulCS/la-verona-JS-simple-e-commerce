import { Product } from "./product.js";
import { returnProductsToBeFiltered } from "./main.js";
import { ProductsCards } from "./ProductsCards.js";
export class Events {
  constructor() {
    this.filterationContainer =
      document.getElementsByClassName("filter-list")[0];
    this.filterBtn = document.getElementsByClassName("filter-btn")[0];
    this.collapseFilter = document.getElementsByClassName("collapse-filter")[0];
    this.applyFilter = document.getElementsByClassName("apply-filter")[0];
    this.shopNow = document.getElementsByClassName("shop-now")[0];
    console.log(this.shopNow);
    this.nav = document.getElementsByClassName("main-nav")[0];
    this.backToTop = document.getElementById("backToTop");
    this.logout = document.getElementById("logout");
    this.btnCart = document.getElementsByClassName("btn-cart")[0]; //account
    this.account = document.getElementsByClassName("logined")[0];
    this.usernameOrLogin = document.getElementById("username-or-login");
    this.#setEvents();
  }

  #showFilterCollabse() {
    this.filterationContainer.classList.toggle("open");
  }

  #setEvents() {
    if (JSON.parse(localStorage.getItem("user")).newlogin)
      this.logout.classList.remove("d-none");
    else this.logout.classList.add("d-none");

    this.btnCart.addEventListener("click", () => {
      if (
        localStorage.getItem("token") ||
        JSON.parse(localStorage.getItem("user")).newlogin
      )
        location.assign("cart.html");
      else location.assign("sign.html");
    });

    if (localStorage.getItem("user"))
      this.usernameOrLogin.textContent = JSON.parse(
        localStorage.getItem("user")
      ).username;
    this.account.addEventListener("click", () => {
      if (localStorage.getItem("user")) {
        ///todo
        location.assign("profile.html");
        console.log(JSON.parse(localStorage.getItem("user")).username);
      } else location.assign("sign.html");
    });

    if (!localStorage.getItem("token")) {
      this.logout.classList.add("d-none");
    } else this.logout.classList.remove("d-none");

    this.logout.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default anchor behavior
      localStorage.removeItem("token");
      location.replace("sign.html"); // navigate without adding history
    });

    this.shopNow.addEventListener("click", () => {
      const nav = this.nav;

      // Save original content and background
      const originalContent = nav.innerHTML;
      const originalBackground = nav.style.backgroundColor;

      // Set nav height to prevent collapse
      const height = nav.offsetHeight + "px";
      nav.style.height = height;

      // Make it flex and center content
      nav.style.display = "flex";
      nav.style.justifyContent = "center";
      nav.style.alignItems = "center";
      nav.style = "background-color:#000 !important";
      nav.style.transition = "background-color 0.5s ease";

      // Set temporary content
      nav.innerHTML =
        '<h1 class="w-100 m-auto text-light fs-1 text-center">Coming Sooooooooooon!</h1>';

      // Restore after 2 seconds
      setTimeout(() => {
        nav.innerHTML = originalContent;
        nav.style.backgroundColor = originalBackground;
        nav.style.display = "";
        nav.style.justifyContent = "";
        nav.style.alignItems = "";
        nav.style.height = "";
      }, 2000);
    });

    this.filterBtn.addEventListener("click", () => this.#showFilterCollabse());
    this.collapseFilter.addEventListener("click", () =>
      this.#showFilterCollabse()
    );

    this.applyFilter.addEventListener("click", () => {
      var products = [];
      returnProductsToBeFiltered().forEach((element) => {
        let product = new Product(element);
        products.push(product);
      });

      var filterdProducts = Product.filterProducts(
        Product.getFilterObject(),
        products
      );

      var productsCards = new ProductsCards();
      filterdProducts.forEach((element) => {
        productsCards.create(element);
        productsCards.addCard();
      });
    });
    window.addEventListener("scroll", () => {
      this.backToTop.style.display = window.scrollY >= 300 ? "block" : "none";
    });

    // Scroll to top smoothly when clicked
    this.backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
