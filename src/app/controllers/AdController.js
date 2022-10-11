import * as Yup from "yup";
import Ad from "../models/Ad";
import User from "../models/User";
import File from "../models/File";
import Comment from "../models/Comment";

class AdController {
  async index(_req, res) {
    const ads = await Ad.findAll({
      order: ["created_at"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
        {
          model: File,
          as: "image",
          attributes: ["url", "path"],
        },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name"],
            },
          ],
          attributes: ["id", "content", "updated_at"],
        },
      ],
    });
    return res.json(ads);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      ingredients: Yup.string().required(),
      value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const { name, description, ingredients, value, image_id } = req.body;

    const ad = await Ad.create({
      name,
      description,
      ingredients,
      value,
      image_id,
      user_id: req.userId,
    });
    return res.json(ad);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string()
        .matches(/\w*[a-zA-Z]\w*/)
        .matches(/\d/),
      password: Yup.string()
        .matches(/\w*[a-zA-Z]\w*/)
        .matches(/\d/)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const { name, oldPassword } = req.body;
    const user = await Ad.findByPk(req.userId);

    if (name && name !== user.name) {
      const userExists = await Ad.findOne({ where: { name } });
      if (userExists) {
        return res.status(400).json({ error: "Ad already exists" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, userName, master } = await user.update(req.body);
    return res.json({ id, userName, master });
  }
}

export default new AdController();
