const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Likes } = require("../models");

router.post("/", validateToken, async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: postId, UserId: userId },
  });
  if (found) {
    await Likes.destroy({ where: { PostId: postId, UserId: userId } });
    res.json({ liked: false });
  } else {
    await Likes.create({ PostId: postId, UserId: userId });
    res.json({ liked: true });
  }
});

module.exports = router;
