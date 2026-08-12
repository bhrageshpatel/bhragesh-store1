export const API_URL =
  "http://localhost:3000/api";


export async function getProducts() {

  const response =
    await fetch(
      `${API_URL}/products`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch products"
    );

  }

  return await response.json();

}