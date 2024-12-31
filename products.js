// Search functionality
document.getElementById("Search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const sections = document.querySelectorAll("section.watch");
    const containers = document.querySelectorAll(".container");

    // Iterate through all sections and their corresponding containers
    sections.forEach((section, index) => {
        const container = containers[index];
        const items = container.querySelectorAll(".box");

        let hasMatchingItems = false;

        items.forEach((item) => {
            const category = item.getAttribute("data-item").toLowerCase();
            if (category.includes(query) || query === "") {
                item.style.display = "block"; // Show matching item
                hasMatchingItems = true;
            } else {
                item.style.display = "none"; // Hide non-matching item
            }
        });

        // Show or hide section based on whether it has matching items
        if (hasMatchingItems || query === "") {
            section.style.display = "block";
            container.style.display = "grid";
        } else {
            section.style.display = "none";
            container.style.display = "none";
        }
    });
});

// Add to cart functionality
function addToCart(name, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
    displayCart(); // Refresh cart display
}

// Remove from cart functionality
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item has been removed from your cart!");
    displayCart(); // Refresh cart display
}

// Display cart functionality
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });
}

