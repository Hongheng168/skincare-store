// Function to render products on the page
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', renderProducts);

// Add event listener to the products container
document.getElementById('products-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = event.target.dataset.id;
        addToCart(productId);
    }
});

// Update the cart icon with the number of items
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon-quantity');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.textContent = totalItems;
}

// --- Event Listeners for Cart Modal ---

// Get modal, buttons, and other elements
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.querySelector('.close-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// When the user clicks the cart icon, open the modal and render cart items
cartIcon.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the link from navigating
    cartModal.style.display = 'block';
    renderCart(); // This function should be in your cart.js
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// When the user clicks the checkout button
checkoutBtn.addEventListener('click', () => {
    checkout(); // This function should also be in your cart.js
});