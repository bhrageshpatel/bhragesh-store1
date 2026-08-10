const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// Fetch Products From Backend
// ===============================

async function loadProducts() {

    try {

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        allProducts = products;

        displayProducts(products);

        updateCartCount();

    } catch (error) {

        console.error("Error loading products:", error);

        productsContainer.innerHTML = `
            <div class="loading">
                Unable to load products.
            </div>
        `;
    }
}


// ===============================
// Display Products
// ===============================

function displayProducts(products) {

    if (products.length === 0) {

        productsContainer.innerHTML = `
            <div class="loading">
                No products found.
            </div>
        `;

        return;
    }


    productsContainer.innerHTML = products.map(product => {

        return `
            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image_url}"
                        alt="${product.name}"
                    >

                </div>


                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>


                    <h3 class="product-name">
                        ${product.name}
                    </h3>


                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <span class="product-price">
                            ₹${Number(product.price).toLocaleString("en-IN")}
                        </span>


                        <div>

                            <button
                                class="add-cart-btn"
                                onclick="addToCart(${product.id})"
                            >
                                Add to Cart
                            </button>


                            <button
                                class="buy-btn"
                                onclick="buyNow(${product.id})"
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// ===============================
// Search Products
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase();


        const filteredProducts = allProducts.filter(product => {

            return (
                product.name
                    .toLowerCase()
                    .includes(searchText) ||

                product.category
                    .toLowerCase()
                    .includes(searchText)
            );

        });


        displayProducts(filteredProducts);

    });

}


// ===============================
// Add Product To Cart
// ===============================

function addToCart(productId) {

    const product = allProducts.find(
        product => product.id === productId
    );


    if (!product) {
        return;
    }


    // Check if product already exists
    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(`${product.name} added to cart`);
}


// ===============================
// Update Cart Count
// ===============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) {
        return;
    }


    const totalQuantity = cart.reduce(

        (total, item) => {

            return total + (item.quantity || 1);

        },

        0

    );


    cartCount.textContent = totalQuantity;
}


// ===============================
// Buy Now
// ===============================

function buyNow(productId) {

    const product = allProducts.find(
        product => product.id === productId
    );


    if (!product) {
        return;
    }


    // Add product to cart
    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Go to cart
    window.location.href = "/cart.html";
}


// ===============================
// Load Products When Page Opens
// ===============================

loadProducts();