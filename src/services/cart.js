// USE CASES:

// -> Add item
// Adds an item to the cart. If the item already exists (by name), its quantity is incremented.
async function addItem(userCart, itemToAdd) {
    const existingItem = userCart.find(item => item.name === itemToAdd.name);
    if (existingItem) {
        existingItem.quantity += itemToAdd.quantity; // Assumes itemToAdd.quantity is the amount to add (e.g., 1)
    } else {
        userCart.push(itemToAdd);
    }
}

// -> Calculate total of the cart
async function calcTotal(userCart) {
   const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
   return result;
}

// -> Delete item
async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item) => item.name === name);

    if (index !== -1) {
        userCart.splice(index, 1);
    }
}


// -> Remove item (reduce quantity by one, or remove if quantity becomes 0)
async function removeItem(userCart, itemObjectFromCart) { // Expects the item object that's in the cart
    const indexFound = userCart.findIndex((cartItem) => cartItem.name === itemObjectFromCart.name);

    if (indexFound === -1) {
        console.log("Item not found in cart to remove.");
        return;
    }

    // If item quantity > 1, then subtract 1 item
    if (userCart[indexFound].quantity > 1) {
        userCart[indexFound].quantity -= 1;
    }
    // If item quantity is 1, then delete the item from the cart
    else if (userCart[indexFound].quantity === 1) { // Fixed: assignment to comparison
        userCart.splice(indexFound, 1);
    }
}


// -> Check cart
async function displayCart (userCart) {
    console.log("\n🛒 Cart list:")
    userCart.forEach((item, index) => {
        console.log(`${index + 1}.${item.name} - R$${item.price} | ${item.quantity} | Subtotal: ${item.subtotal()}`);
    })
}

export default {
    addItem,
    deleteItem,
    removeItem,
    calcTotal,
    displayCart
}
