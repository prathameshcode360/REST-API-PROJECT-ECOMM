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
}
var cartItems = {};
