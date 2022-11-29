const BASE_URL = "https://capstone-backend-team7.onrender.com";

export async function logInUser(email, password) {
  console.log(email, password);
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

export async function getAllProducts() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URL}/api/products`, options);
  const result = await response.json();
  return result;
}

export async function register(first_name, last_name, email, password) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      is_admin: false
    })
  };
  const response = await fetch(`${BASE_URL}/api/users/register`, options)
  const result = await response.json();
  return result;
}