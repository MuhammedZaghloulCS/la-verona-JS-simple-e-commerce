import { FakeAPI } from "./FakeAPI.js";

class Profile {
  phoneREG = /^(\+2|2)?(01)(\d{9})$/;
  usernameRegex = /^[a-z0-9_]{4,15}$/;
  passwordRegex = /^\S{5,32}$/;
  emailREG = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  constructor() {
    // Get user from localStorage safely
    this.user = JSON.parse(localStorage.getItem("user")) || {};

    // Form fields
    this.firstname = document.getElementById("fname");
    this.lastname = document.getElementById("lname");
    this.username = document.getElementById("username");
    this.email = document.getElementById("email");
    this.phone = document.getElementById("phone");
    this.street = document.getElementById("street");
    this.stnumber = document.getElementById("number");
    this.city = document.getElementById("city");
    this.zipcode = document.getElementById("zipcode");
    this.lat = document.getElementById("lat");
    this.long = document.getElementById("long");

    this.saveChangesBtn = document.getElementById("btn-save");

    this.init();
  }

  init() {
    // Safely fill the form with existing user data
    this.firstname.value = this.user?.name?.firstname || "";
    this.lastname.value = this.user?.name?.lastname || "";
    this.username.value = this.user?.username || "";
    this.email.value = this.user?.email || "";
    this.phone.value = this.user?.phone || "";
    this.street.value = this.user?.address?.street || "";
    this.stnumber.value = this.user?.address?.number || "";
    this.city.value = this.user?.address?.city || "";
    this.zipcode.value = this.user?.address?.zipcode || "";
    this.lat.value = this.user?.address?.geolocation?.lat || "";
    this.long.value = this.user?.address?.geolocation?.long || "";

    // Update location every second
    this.interval = setInterval(() => this.getLocation(), 1000);

    // Save button
    this.saveChangesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.saveChanges();
    });
  }

  #getFormData() {
    return {
      id: this.user.id || Date.now(), // generate id if not present
      email: this.email.value.trim() || this.user.email || "",
      username: this.username.value.trim() || this.user.username || "",
      password: this.user.password || "", // password remains unchanged
      name: {
        firstname:
          this.firstname.value.trim() || this.user?.name?.firstname || "",
        lastname: this.lastname.value.trim() || this.user?.name?.lastname || "",
      },
      address: {
        city: this.city.value.trim() || this.user?.address?.city || "",
        street: this.street.value.trim() || this.user?.address?.street || "",
        number: this.stnumber.value.trim() || this.user?.address?.number || "",
        zipcode: this.zipcode.value.trim() || this.user?.address?.zipcode || "",
        geolocation: {
          lat:
            this.lat.value.trim() || this.user?.address?.geolocation?.lat || "",
          long:
            this.long.value.trim() ||
            this.user?.address?.geolocation?.long ||
            "",
        },
      },
      phone: this.phone.value.trim() || this.user?.phone || "",
    };
  }

  async saveChanges() {
    const emailErr = document.getElementById("email-err");
    const usernameErr = document.getElementById("username-err");

    const isUsernameValid = this.usernameRegex.test(this.username.value.trim());
    const isEmailValid = this.emailREG.test(this.email.value.trim());

    // Hide previous errors
    emailErr.classList.add("d-none");
    usernameErr.classList.add("d-none");

    if (!isUsernameValid) usernameErr.classList.remove("d-none");
    if (!isEmailValid) emailErr.classList.remove("d-none");

    if (!isUsernameValid || !isEmailValid) return;

    this.newUser = this.#getFormData();

    try {
      const api = new FakeAPI();
      const users = await api.getAllUsersWithOutAuth();

      const usernameTaken = users.some(
        (u) => u.username === this.newUser.username && u.id !== this.newUser.id
      );
      const emailTaken = users.some(
        (u) => u.email === this.newUser.email && u.id !== this.newUser.id
      );

      if (usernameTaken) {
        usernameErr.innerText = "This username is already taken";
        usernameErr.classList.remove("d-none");
        return;
      }
      if (emailTaken) {
        emailErr.innerText = "This email is already used before";
        emailErr.classList.remove("d-none");
        return;
      }

      // Update user through API
      const updatedUser = await api.updateUser(this.newUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      emailErr.innerText = "Changes Saved Successfully";
      emailErr.classList.remove("d-none", "text-danger");
      emailErr.classList.add("text-success");

      setTimeout(() => {
        clearInterval(this.interval);
        location.replace("index.html");
      }, 2000);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat.value = position.coords.latitude;
        this.long.value = position.coords.longitude;
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }
}

new Profile();
