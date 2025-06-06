import cartService from "./services/cart.js";
import { createItem } from "./services/item.js";

const myCart = [];
let availableProducts = [];

// DOM Elements
const productListDiv = document.getElementById('productList');
const cartItemsListUl = document.getElementById('cartItemsList');
const cartTotalSpan = document.getElementById('cartTotal');

// --- Product Definition & Rendering ---
async function initializeProducts() {
    // Define some sample products
    const item1 = await createItem("Hotwheels Ferrari", 20.99, 1); // Base quantity for product listing
    const item2 = await createItem("Hotwheels Lamborghini", 24.99, 1);
    const item3 = await createItem("Hotwheels Porsche", 22.50, 1);
    availableProducts = [item1, item2, item3];
    renderProducts();
}

function renderProducts() {
    productListDiv.innerHTML = ''; // Clear existing products
    availableProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item'); // For styling
        productDiv.innerHTML = `
            <span>${product.name} - R$ ${product.price.toFixed(2)}</span>
            <button data-product-name="${product.name}">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);

        // Add event listener for the "Add to Cart" button
        productDiv.querySelector('button').addEventListener('click', async () => {
            const productName = product.name; // Use product from forEach closure
            const productToAdd = availableProducts.find(p => p.name === productName);
            if (productToAdd) {
                // Create a new item instance with quantity 1 for adding to cart
                const cartItemInstance = await createItem(productToAdd.name, productToAdd.price, 1);
                await cartService.addItem(myCart, cartItemInstance);
                await updateCartDisplay();
            }
        });
    });
}

// --- Cart Display & Update ---
async function updateCartDisplay() {
    cartItemsListUl.innerHTML = ''; // Clear existing cart items

    myCart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item'); // For styling
        listItem.innerHTML = `
            <span>${item.name} (R$ ${item.price.toFixed(2)}) - Qty: ${item.quantity} - Subtotal: R$ ${item.subtotal().toFixed(2)}</span>
            <div>
                <button class="remove-one" data-item-name="${item.name}">Remove One</button>
                <button class="delete-item" data-item-name="${item.name}">Delete All</button>
            </div>
        `;
        cartItemsListUl.appendChild(listItem);
    });

    // Add event listeners for cart item buttons (delegation could be used for performance on large lists)
    document.querySelectorAll('.cart-item .remove-one').forEach(button => {
        button.addEventListener('click', async (event) => {
            const itemName = event.target.dataset.itemName;
            const itemInCart = myCart.find(i => i.name === itemName);
            if (itemInCart) {
                await cartService.removeItem(myCart, itemInCart); // Pass the actual item object
                await updateCartDisplay();
            }
        });
    });

    document.querySelectorAll('.cart-item .delete-item').forEach(button => {
        button.addEventListener('click', async (event) => {
            const itemName = event.target.dataset.itemName;
            await cartService.deleteItem(myCart, itemName); // deleteItem uses name
            await updateCartDisplay();
        });
    });

    const total = await cartService.calcTotal(myCart);
    cartTotalSpan.textContent = total.toFixed(2);
}

// --- Initial Setup ---
async function main() {
    await initializeProducts();
    await updateCartDisplay(); // Initial cart display (should be empty)
}

main();