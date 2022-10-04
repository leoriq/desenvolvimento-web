import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string()
        .required()
        .matches(/\w*[a-zA-Z]\w*/)
        .matches(/\d/),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const reqUser = await User.findByPk(req.userId);
    if (!reqUser.master) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const userExists = await User.findOne({ where: { name: req.body.name } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
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
    const reqUser = await User.findByPk(req.userId);

    var user
    if (reqUser.master) {
      user = await User.findByPk(req.body.id);
    } else {
      user = reqUser;
    }

    if (name && name !== user.name) {
      const userExists = await User.findOne({ where: { name } });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, userName, master } = await user.update(req.body);
    return res.json({ id, userName, master });
  }

  async delete(req, res) {
    const reqUser = await User.findByPk(req.userId);
    if (!reqUser.master) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const user = await User.findByPk(parseInt(req.params.id));
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    await user.destroy();
    return res.json({ message: "User deleted" });
  }
}

export default new UserController();
