import CartItemModel from "./cartitems.model.js";
import CartItemsRepository from "./cartitems.repository.js";
class CartItemController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      await this.cartItemsRepository.add(productID, userID, quantity);
      res.status(201).send("cart is updated");
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid product or UserID");
    }
  }
  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartItemsRepository.get(userID);
      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid get request");
    }
  }
  async delete(req, res) {
    const userID = req.userID;
    const cartitemID = req.params.id;
    const isDeleted = await this.cartItemsRepository.delete(userID, cartitemID);
    if (!isDeleted) {
      return res.status(404).send("Item notm found");
    } else {
      return res.status(200).send("cart item deleted");
    }
  }
}

export default CartItemController;
