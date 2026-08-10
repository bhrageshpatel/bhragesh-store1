const cartItemsContainer = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const cartSummary = document.getElementById("cart-summary");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");


// Get cart from browser storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display cart
function displayCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

        cartCount.textContent = "0";

        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";


    let total = 0;
    let totalQuantity = 0;


    cart.forEach((product, index) => {

        const quantity = product.quantity || 1;

        const price = Number(product.price);

        const itemTotal = price * quantity;

        total += itemTotal;

        totalQuantity += quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-product">

                <img
                    src="${product.image_url}"
                    alt="${product.name}"
                >

                <div>

                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <strong>
                        ₹${price.toLocaleString("en-IN")}
                    </strong>

                </div>

            </div>


            <div class="quantity-control">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="item-total">

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(item);

    });


    cartCount.textContent = totalQuantity;

    cartSubtotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();

}


// Decrease quantity
function decreaseQuantity(index) {

    if ((cart[index].quantity || 1) > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Save cart
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Checkout
document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        window.location.href = "/checkout.html";

    });


// Initial load
displayCart();