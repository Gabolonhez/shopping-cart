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

    if (index !== -1) {
        userCart.splice(index, 1);
    }
}


// -> Remove item 
async function removeItem(userCart, item) {
    const indexFound = userCart.findIndex((p) => p.name === item.name) 
   
    // Found the item index

    if (indexFound == -1) {
        console.log("Item not found");
        return;
    }

    // If Item > 1, then subtract 1 item

    if (userCart[indexFound].quantity > 1) {
        userCart[indexFound].quantity -= 1;
        return;

    }

    // If Item = 1, then delet the item
    if(userCart[indexFound].quantity = 1) {
        userCart.splice(indexFound, 1);
        return;
    } 


}


// -> Remove item by index
// async function removeItem(userCart, index) {

//     const deleteIndex = index - 1;

//     if (index >= 1 && index <= userCart.length) {
//         userCart.splice(deleteIndex, 1);
//     }
// } 


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

