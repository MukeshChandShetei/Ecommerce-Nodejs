//productID,userID,quantity
class CartItemModel {
  constructor(productID, userID, quantity, id) {
    (this.productID = productID),
      (this.userID = userID),
      (this.quantity = quantity),
      (this.id = id);
  }

  //user adding items in to the cart
  static add(productID, userID, quantity) {
    const cartItem = new CartItemModel(productID, userID, quantity);
    cartItem.id = cartitmes.length + 1;
    cartitmes.push(cartItem);

    return cartItem;
  }

  static get(userID) {
    return cartitmes.filter((u) => u.userID == userID);
  }

  static delete(cartItemID, userID) {
    //check whether item is present or not
    const cartItem = cartitmes.findIndex(
      (i) => i.id == cartItemID && i.userID == userID
    );
    if (cartItem == -1) {
      return "Items not found";
    } else {
      const index = cartitmes.splice(cartItem, 1);
    }
  }
}

//for customer create some cartitmes
var cartitmes = [
  new CartItemModel(1, 2, 1, 1),
  new CartItemModel(2, 3, 2, 2),
  new CartItemModel(3, 4, 3, 3),
];
export default CartItemModel;
