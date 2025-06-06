import cartService from "./services/cart.js";
import { createItem } from "./services/item.js";

const myCart = [];
const myWishList = [];

 

const item1 = await createItem("Hotwheels Ferrari", 20.99, 2);
const item2 = await createItem("Hotwheels Lamborghini", 24.99, 2);  

await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);

await cartService.removeItem(myCart, item1);
await cartService.removeItem(myCart, item2);

// await cartService.deleteItem(myCart, item2.name);
// await cartService.deleteItem(myCart, item1.name);

await cartService.calcTotal(myCart);  

cartService.displayCart(myCart); 


