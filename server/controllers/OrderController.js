const Order = require("../models/Order");
const OrderDetails = require("../models/OrderDetails");

const getAllOrder = async (req, res) => {
  const limit = +req.query.limt || 10;
  const page = +req.query.page || 1;
  const total = await Order.countDocuments();
  const skip = (page - 1) * limit;
  const sort = "-createdAt";

  try {
    const order = await Order.find().limit(limit).skip(skip).sort(sort);
    return res.json({
      success: true,
      order,
      totalPage: Math.ceil(total / limit),
      totalOrder: total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      totalOrder: req.body.totalOrder,
      statusOrder: "Đang xác nhận",
      payments: req.body.payments,
      isPaid: false,
      userId: req.userId,
      note: req.body.note,
    });

    await newOrder.save();

    const newOrderDetails = new OrderDetails({
      oderId: newOrder._id,
      products: req.body.products,
    });

    await newOrderDetails.save();

    return res.json({
      success: true,
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getMyOrder = async (req, res) => {
  const userId = req.userId;
  const limit = +req.query.limt || 10;
  const page = +req.query.page || 1;
  const total = await Order.countDocuments({ userId });
  const skip = (page - 1) * limit;
  const sort = "-createdAt";

  try {
    const order = await Order.find({ userId })
      .limit(limit)
      .skip(skip)
      .sort(sort);
    return res.json({
      success: true,
      order,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const deleteOrder = async (req, res) => {
  const _id = req.params.id;
  try {
    const checkDeleteOrder = await Order.findOneAndDelete({ _id });
    if (!checkDeleteOrder)
      return res.json({
        success: false,
        message: "Delete order fail!",
      });

    const checkDeleteOrderDetails = await OrderDetails.findByIdAndDelete({
      oderId: _id,
    });

    if (!checkDeleteOrderDetails)
      return res.json({
        success: false,
        message: "Delete order fail!",
      });

    return res.json({
      success: true,
      message: "Delete order success!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getOrderbyId = async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.findOne({ _id: _id });
    const orderDetails = await OrderDetails.findOne({ oderId: _id });

    return res.json({
      success: true,
      order,
      orderDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const editOderbyId = async (req, res) => {
  try {
    await Order.findOneAndUpdate({_id: req.body._id}, req.body)
    return res.json({
      success: true,
      message: "Edit order success!"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
}

module.exports = {
  getAllOrder,
  createOrder,
  getMyOrder,
  deleteOrder,
  getOrderbyId,
  editOderbyId
};
