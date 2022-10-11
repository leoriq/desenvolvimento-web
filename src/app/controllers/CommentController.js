import * as Yup from "yup";
import Comment from "../models/Comment";
import User from "../models/User";

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const userExists = await User.findByPk(req.userId);
    if (!userExists) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const { content } = req.body;
    const comment = await Comment.create({ content, user_id: req.userId });
    return res.json(comment);
  }
}

export default new CommentController();
