const BASE_URL = "https://capstone-backend-team7.onrender.com";

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
