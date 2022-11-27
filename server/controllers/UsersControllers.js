const Users = require("../models/Users");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Mising parameters !!!",
    });
  }

  const verifyEmail = await Users.findOne({ email });
  if (!verifyEmail) {
    return res.status(400).json({
      success: false,
      message: "User not found !!!",
    });
  }

  const verifyPassword = await argon2.verify(verifyEmail.password, password);
  if (!verifyPassword) {
    return res.status(400).json({
      success: false,
      message: "Password was wrong !!!",
    });
  }

  const token = jwt.sign(
    {
      userId: verifyEmail._id,
      roleId: verifyEmail.roleId,
    },
    process.env.PASSJWT
  );

  return res.status(200).json({
    success: true,
    message: "Login success !!!",
    token,
  });
};

const registerUsers = async (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Mising parameters !!!",
    });
  }

  try {
    const existEmail = await Users.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email existing !!!",
      });
    }

    const hashPassword = await argon2.hash(password);

    const newUser = new Users({
      email,
      password,
      name,
      roleId: "user",
      password: hashPassword,
      image:
        "https://genvita.vn/resources/avatar/1157843c-1248-4960-b75e-df0031e903d6?width=119&height=119&mode=crop",
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        roleId: newUser.roleId,
      },
      process.env.PASSJWT
    );

    return res.status(203).json({
      success: true,
      message: "Register success !!!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Register failed !!!",
    });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.userId;
  const userInfo = await Users.findOne({ _id: userId }).select("-password");
  if (!userInfo)
    return res.send(400).json({
      success: false,
      message: "User not found !!!",
    });
  return res.status(200).json({
    success: true,
    user: userInfo,
  });
};

const editUser = async (req, res) => {
  const userId = req.userId;
  const idEdit = req.body._id;
  if (userId !== idEdit) {
    return res.status(400).json({
      success: false,
      message: "Bạn chỉ được chỉnh sửa thông tin của bạn!",
    });
  }
  try {
    const userInfo = await Users.findOne({ _id: idEdit });
    if (req.body.passwordOld && req.body.password) {
      const verifyPassword = await argon2.verify(
        userInfo.password,
        req.body.passwordOld
      );

      if (!verifyPassword) {
        return res.status(404).json({
          success: false,
          message: "Mật khẩu cũ bị sai vui lòng kiểm tra lại!",
        });
      }

      const hashPassword = await argon2.hash(req.body.password);
      await Users.findByIdAndUpdate(idEdit, {
        ...req.body,
        password: hashPassword,
      });
    } else {
      await Users.findByIdAndUpdate(idEdit, {
        name: req.body.name,
        email: req.body.email,
      });
    }

    return res.json({
      success: true,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = {
  loginUsers,
  registerUsers,
  getUserInfo,
  editUser,
};
