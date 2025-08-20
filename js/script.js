//Scrpt.js
// Function to render products on the page
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
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

// Call the function and Add event listener
document.addEventListener('DOMContentLoaded', renderProducts);
document.getElementById('products-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = event.target.dataset.id;
        addToCart(productId);
    }
});

// Update the cart
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon-quantity');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.textContent = totalItems;
}
// Get modal, buttons, and other elements
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.querySelector('.close-btn');
const checkoutBtn = document.getElementById('checkout-btn');

//open the modal and render cart items
cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartModal.style.display = 'block';
    renderCart();
});

//close the modal
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
    checkout();
});