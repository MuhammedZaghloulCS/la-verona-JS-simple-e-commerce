import { FakeAPI } from "./FakeAPI.js";

class Sign {
  usernameRegex = /^[a-z0-9_]{4,15}$/;
  passwordRegex = /^\S{5,32}/;

  constructor() {
    if (localStorage.getItem("token")) window.location = "index.html";

    this.signUpBtn = document.getElementById("switchToSignup");
    this.signInBtn = document.getElementById("switchToLogin");

    this.signupForm = document.getElementsByClassName("signup-form")[0];

    //login
    this.loginForm = document.getElementsByClassName("login-form")[0];
    this.loginEmail = document.getElementById("loginEmail");
    this.loginPassword = document.getElementById("loginPassword");
    this.loginBtn = document.getElementsByClassName("login-btn")[0];
    this.rememberMe = document.getElementById("rememberMe");
    this.getAllUsers = new FakeAPI().getAllUsers;
    //alert
    this.wrongAlert = document.getElementsByClassName("wrong")[0];
    console.log(this.signUpBtn);
    //signup
    this.signupFname = document.getElementById("signupFname");
    this.signupUsername = document.getElementById("signupUsername");
    this.signupLname = document.getElementById("signupLname");
    this.signupEmail = document.getElementById("signupEmail");
    this.signupPassword = document.getElementById("signupPassword");
    this.signupPassword2 = document.getElementById("signupPassword2");
    // Grab alert elements
    const alert1 = document.getElementById("alert1"); // Username invalid
    const alert2 = document.getElementById("alert2"); // Email invalid
    const alert3 = document.getElementById("alert3"); // Password invalid
    const alert4 = document.getElementById("alert4"); // Passwords do not match
    const alert5 = document.getElementById("alert5"); // First name invalid
    const alert6 = document.getElementById("alert6"); // Last name invalid

    // Initially hide all alerts
    [alert1, alert2, alert3, alert4, alert5, alert6].forEach(
      (a) => (a.style.display = "none")
    );
    this.init();
  }

  async init() {
    this.signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let valid = true;
      [alert1, alert2, alert3, alert4, alert5, alert6].forEach(
        (a) => (a.style.display = "none")
      ); // hide all alerts

      // Name validation
      const nameRegex = /^[A-Za-z]{2,30}$/;
      if (!nameRegex.test(this.signupFname.value)) {
        alert5.textContent = "First name must be 2-30 letters.";
        alert5.style.display = "block";
        valid = false;
      }
      if (!nameRegex.test(this.signupLname.value)) {
        alert6.textContent = "Last name must be 2-30 letters.";
        alert6.style.display = "block";
        valid = false;
      }

      // Username validation
      if (!this.usernameRegex.test(this.signupUsername.value)) {
        alert1.textContent = "Username invalid: 4-15 letters, numbers, or _";
        alert1.style.display = "block";
        valid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.signupEmail.value)) {
        alert2.textContent = "Email is not valid";
        alert2.style.display = "block";
        valid = false;
      }

      // Password validation
      const passwordRegex = /^\S{5,32}$/;
      if (!passwordRegex.test(this.signupPassword.value)) {
        alert3.textContent = "Password must be 5-32 characters without spaces";
        alert3.style.display = "block";
        valid = false;
      } else if (this.signupPassword.value !== this.signupPassword2.value) {
        alert4.textContent = "Passwords do not match";
        alert4.style.display = "block";
        valid = false;
      }

      if (!valid) return;

      // Prepare user data for API
      const user = {
        email: this.signupEmail.value,
        username: this.signupUsername.value,
        password: this.signupPassword.value,
        name: {
          firstname: this.signupFname.value,
          lastname: this.signupLname.value,
        },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: { lat: "", long: "" },
        },
        phone: "",
      };

      try {
        const res = await fetch("https://fakestoreapi.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!res.ok) throw new Error("Signup failed!");
        location.replace("profile.html");
        user.newlogin = true;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
        alert3.textContent = "Signup failed: " + err.message;
        alert3.style.display = "block";
      }
    });
    this.signUpBtn.addEventListener("click", () => {
      this.loginForm.style.display = "none";
      this.signupForm.style.display = "block";
      this.signupForm.style.opacity = 1;
      this.signupForm.style.transform = "translateX(0px)";
    });
    this.signInBtn.addEventListener("click", () => {
      this.loginForm.style.display = "none";
      this.signupForm.style.display = "block";
      this.signupForm.style.opacity = 1;
      this.signupForm.style.transform = "translateX(0px)";
    });
    this.loginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (
        this.#isvalid(this.usernameRegex, this.loginEmail.value) &&
        this.#isvalid(this.passwordRegex, this.loginPassword.value)
      ) {
        try {
          var auth = {
            username: this.loginEmail.value,
            password: this.loginPassword.value,
          };

          const data = await this.auth(auth); //returns error if unauthorized so it will go to catch
          console.log("auth done");
          const myUser = JSON.parse(await this.getAllUsers(auth.username));
          myUser.password = "";
          localStorage.setItem("token", data.token);

          localStorage.setItem("user", JSON.stringify(myUser));

          location.replace("index.html");
        } catch (error) {
          this.wrongAlert.style = "display:block";
          this.loginEmail.value = "";
          this.loginPassword.value = "";
        }
      } else {
        this.wrongAlert.style = "display:block";
        this.loginEmail.value = "";
        this.loginPassword.value = "";
      }
    });
  }

  #isvalid(reg, text) {
    return reg.test(text);
  }
  async auth(auth) {
    try {
      const credentials = { username: "", password: "" };
      Object.assign(credentials, auth);

      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        // if server returns 4xx or 5xx
        throw new Error(`Login failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data; // expected: { token: "..." }
    } catch (error) {
      throw error; // rethrow so caller can handle it
    }
  }
}

var x = new Sign();
console.log(x.auth({ username: "johnd", password: "m38rmF$" }));
