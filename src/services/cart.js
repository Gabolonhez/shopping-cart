// USE CASES:

// -> Add item

async function addItem(userCart, item) {
    userCart.push(item);
}

// -> Calculate total of the cart
async function calcTotal(userCart) {
    console.log("💰Cart total is:");
   const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
   
   console.log(`${result.toFixed(2)}`);
}

// -> Delete item

async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item) => item.name === name);

    if (index !== 1) {
        userCart.splice(index, 1);
    }
}


// -> Remove item

async function removeItem(userCart, index) {

} 


// Check cart

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

