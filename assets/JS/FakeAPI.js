export class FakeAPI {
  async getProducts(url = "") {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (err) {
      if (!this.again) {
        this.again = true;
        return await this.getProducts(url); //  retry
      } else {
        console.log(err.message);
        return []; //returns empty array
      }
    }
  }
  async getAllUsers(auth) {
    var res = await fetch("https://fakestoreapi.com/users");
    var data = await res.json();
    var user;
    data.forEach((element) => {
      if (element.username == auth) user = element;
    });
    return JSON.stringify(user);
  }
  async getAllUsersWithOutAuth()
  {
    var res = await fetch("https://fakestoreapi.com/users");
    var data = await res.json();
    return data
  }
  async updateUser(user) {
    try {
      const res = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: "PUT", // or PATCH if you want partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // send the updated user
      });

      if (!res.ok) {
        throw new Error(
          `Failed to update user: ${res.status} ${res.statusText}`
        );
      }

      const updatedUser = await res.json();
      console.log(" User updated:", updatedUser);
      return updatedUser;
    } catch (err) {
      console.error(" Update failed:", err);
      return err;
    }
  }
}
