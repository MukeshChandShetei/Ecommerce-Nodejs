import LikesRepository from "./likes.repository.js";

class LikesController {
  constructor() {
    this.likeRepository = new LikesRepository();
  }

  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userID;
      if (type != "products" && type != "categories") {
        return res.status(400).send("Invalid Type");
      }
      if (type == "products") {
        this.likeRepository.likeProduct(userId, id);
      } else {
        this.likeRepository.likeCategory(userId, id);
      }
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send("Somrthing went wrong in likeitem");
    }
  }

  async retriveLikeFromDatabase(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(type, id);
      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Somrthing went wrong");
    }
  }
}
export default LikesController;
