const BASE_URL = "https://capstone-backend-team7.onrender.com";

//----------------USERS ADAPTERS----------------
//LOGIN USER
export async function logInUser(email, password) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  let response = await fetch(`${BASE_URL}/api/users/login`, options);
  let result = await response.json();
  console.log(result);
  return result;
}

//REGISTER USER
export async function register(first_name, last_name, email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      is_admin: false,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/users/register`, options);
  const result = await response.json();
  return result;
}

//GET MY ACCOUNT
export async function myAccount(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/users/me`, options);
  const result = await response.json();
  return result;
}

//----------------PRODUCTS ADAPTERS----------------
//POST ALL PRODUCTS
export async function getAllProducts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URL}/api/products`, options);
  const result = await response.json();
  return result;
}

//GET PRODUCT BY PRODUCT ID
export async function getProductByProductId(productId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/products/${productId}`,
    options
  );
  const result = await response.json();
  return result;
}

//----------------CARTS ADAPTERS----------------

//ADD PRODUCT TO CART
export async function addProductToCart(token, cart_id, product_id, quantity) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: product_id,
      quantity: quantity,
    }),
  };
  const response = await fetch(
    `${BASE_URL}/api/carts/${cart_id}/products`,
    options
  );
  const result = await response.json();
  return result;
}

//CREATE NEW CART
export async function createCart(token, user_id) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/carts/${user_id}`, options);
  const result = await response.json();
  return result;
}

//GET CART BY EMAIL
export async function getCartByEmail(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/carts/myCartByEmail`, options);
  const result = await response.json();
  return result;
}

//GET CART BY USER ID
export async function getCartByUserId(user_id, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/carts/myCartByUserId`, options);
  const result = await response.json();
  return result;
}

//UPDATE CART COMPLETION
export async function updateCartCompletion(cart_id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/carts/${cart_id}`, options);
  const result = await response.json();
  return result;
}

//DELETE USER CART
export async function deleteCart(token, cartId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/carts/${cartId}`, options);
  const result = await response.json();
  return result;
}

//----------------CART PRODUCTS ADAPTERS----------------

//UPDATE CART PRODUCT QUANTITY
export async function updateCartProductQuantity(
  token,
  cartProductId,
  quantity
) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  };
  const response = await fetch(
    `${BASE_URL}/api/cart_products/${cartProductId}`,
    options
  );
  const result = await response.json();
  return result;
}

//DELETE CART PRODUCT
export async function deleteCartProduct(token, cartProductId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/cart_products/${cartProductId}`,
    options
  );
  const result = await response.json();
  return result;
}

//----------------ADMIN ADAPTERS----------------

export async function createProduct(
  token,
  name,
  description,
  price,
  image_url,
  inventory,
  on_sale,
  sale_percentage
) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      inventory: inventory,
      on_sale: on_sale,
      sale_percentage: sale_percentage,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/admin/products`, options);
  const result = await response.json();
  return result;
}

export async function deleteProduct(token, productId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/admin/products/${productId}`,
    options
  );
  const result = await response.json();
  return result;
}

export async function updateProduct(
  token,
  productId,
  name,
  description,
  price,
  image_url,
  inventory,
  on_sale,
  sale_percentage
) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      inventory: inventory,
      on_sale: on_sale,
      sale_percentage: sale_percentage,
    }),
  };
  const response = await fetch(
    `${BASE_URL}/api/admin/products/${productId}`,
    options
  );
  const result = await response.json();
  return result;
}

export async function getAllUsers(token) {
  // const token = localStorage.getItem("token")
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/admin/users`, options);
  const result = await response.json();
  return result;
}

export async function getUserByUserId(token, userId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/admin/users/${userId}`,
    options
  );
  const result = await response.json();
  return result;
}
