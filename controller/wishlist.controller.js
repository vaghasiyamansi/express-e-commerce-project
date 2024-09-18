const FavoriteServices = require("../services/wishlist.services");
const favoriteService = new FavoriteServices();

exports.addToFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.getFavorite({
      product: req.body.product,
      user: req.user._id,
      isDelete: false,
    });
    // console.log(favorite);
    if (favorite) {
      return res
        .status(400)
        .json({ message: "Product already in your favorite list." });
    }
    favorite = await favoriteService.addToFavorite({
      ...req.body,
      user: req.user._id,
    });
    return res
      .status(201)
      .json({
        favorite,
        message: "Product added in your favorite list successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error ${console.error()}` });
  }
};

exports.getAllFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.getAllFavorite({ isDelete: false });
    if (!favorite) {
      res.status(404).json({ message: "No data found." });
    }
    res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error ${console.error()}` });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.getFavorite({
      _id: req.query.favoriteId,
      isDelete: false,
    });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }
    favorite = await favoriteService.updateFavorite(req.query.favoriteId, {
      isDelete: true,
    });
    res
      .status(201)
      .json({ favorite, message: "Favorite Item is Deleted Successfully.." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error ${console.error()}` });
  }
};