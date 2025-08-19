// cart.js

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        console.log('Product added to cart:', product.name);
        console.log('Current Cart:', cart);
        renderCart(); // Call to render cart items
        updateCartIcon(); // Call to update cart icon
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    renderCart();
    updateCartIcon();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id == productId);
    if (item) {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            removeFromCart(productId);
        }
    }
    renderCart();
    updateCartIcon();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Event listeners for the cart popup
document.getElementById('cart-modal').addEventListener('click', (event) => {
    const target = event.target;
    const productId = target.dataset.id;
    if (target.classList.contains('remove-from-cart-btn')) {
        removeFromCart(productId);
    } else if (target.classList.contains('quantity-btn')) {
        const item = cart.find(item => item.id == productId);
        if (item) {
            const newQuantity = target.classList.contains('increase') ? item.quantity + 1 : item.quantity - 1;
            updateQuantity(productId, newQuantity);
        }
    }
});
// Mock checkout function
function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout! Total: $' + document.getElementById('total-price').textContent);
        cart = []; // Clear cart after checkout
        renderCart();
        updateCartIcon();
    } else {
        alert('Your cart is empty.');
    }
}