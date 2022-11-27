const Users = require("../models/Users");

const getAllUsers = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const total = await Users.countDocuments({ roleId: "user" });
  const sort = "-createdAt";
  try {
    const users = await Users.find({ roleId: "user" })
      .limit(limit)
      .skip(skip)
      .sort(sort);

    return res.json({
      success: true,
      users,
      totalPage: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const destroyUsers = await Users.findOneAndDelete({ _id: req.query.id });

    if (!destroyUsers) {
      return res.status(401).json({
        success: false,
        message: "Delete user failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete user success !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const conditionUpdate = { _id: req.body._id };
    const checkUpdate = await Users.findOneAndUpdate(
      conditionUpdate,
      req.body,
      {
        new: true,
      }
    );
    if (!checkUpdate) {
      return res.status(401).json({
        success: false,
        message: "Update user failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Update user success !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userInfo = await Users.findOne({ _id: req.params.id }).select(
      "-password"
    );
    if (userInfo) {
      return res.json({
        success: true,
        user: userInfo,
      });
    }
    return res.status(400).json({
      success: false,
      message: "User not found !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUsers,
  updateUsers,
  getUser,
};
