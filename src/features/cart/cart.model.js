export default class CartModel {
  constructor(cartId, userId, productId, quantity) {
    this.cartId = cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }
  static add(userId, productId, quantity) {
    if (!cartItems[userId]) {
      cartItems[userId] = [];
    }
    const newItem = new CartModel(
      cartItems[userId].length + 1,
      userId,
      productId,
      quantity
    );
    cartItems[userId].push(newItem);
    return newItem;
  }

  static getItems(userId) {
    if (cartItems[userId]) {
      return cartItems[userId];
    } else {
      return "No cart items";
    }
  }
  static update(userId, cartId, quantity) {
    if (!cartItems[userId]) {
      return "Cart not found"; // ✅ User ka cart exist hi nahi karta
    }

    const cartItem = cartItems[userId].find((item) => item.cartId == cartId);

    if (!cartItem) {
      return "Item not found"; // ✅ Cart me item nahi mila
    }

    cartItem.quantity = quantity; // ✅ Quantity update ho gayi
    return "Item updated successfully"; // ✅ Proper success response
  }
}
var cartItems = {};
