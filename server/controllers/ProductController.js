const Products = require("../models/Products");
const Description = require("../models/Description");
const Configuration = require("../models/Configuration");

const addProduct = async (req, res) => {
  try {
    const newProduct = new Products({
      name: req.body.name,
      newPrice: req.body.newPrice,
      oldPrice: req.body.oldPrice,
      image: req.body.image,
      colors: req.body.colors,
      memorys: req.body.memorys,
      category: req.body.category,
      thumnail: req.body.thumnail,
    });

    await newProduct.save();

    const newDescription = new Description({
      productId: newProduct._id,
      contentHtml: req.body.contentHtml,
      contentMarkdown: req.body.contentMarkdown,
    });

    await newDescription.save();

    const newConfiguration = new Configuration({
      productId: newProduct._id,
      display: req.body.display,
      resolution: req.body.resolution,
      operatingSystem: req.body.operatingSystem,
      chipset: req.body.chipset,
      ram: req.body.ram,
      mobileNetwork: req.body.mobileNetwork,
      pin: req.body.pin,
    });

    await newConfiguration.save();

    return res.status(203).json({
      success: true,
      message: "Create products success !!",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getProducts = async (req, res) => {
  const sort = "-createdAt";
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const total = await Products.countDocuments();
  const totalCategory = await Products.countDocuments({
    category: req.query.category,
  });
  try {
    if (!req.query.category || req.query.category === "All") {
      const products = await Products.find().sort(sort).skip(skip).limit(limit);
      return res.status(200).json({
        success: true,
        products,
        type: "getAll",
        totalPage: Math.ceil(total / limit),
        totalProducts: total,
      });
    } else {
      const products = await Products.find({
        category: req.query.category,
      })
        .sort(sort)
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        success: true,
        products,
        type: "getCategory",
        totalPage: Math.ceil(totalCategory / limit),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    await Products.findOneAndDelete({ _id: req.params.id });
    await Configuration.findOneAndDelete({
      productId: req.params.id,
    });
    return res.status(200).json({
      success: true,
      message: "Delete success !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id });
    if (!product)
      return res.status(500).json({
        success: false,
        message: "Product not found !",
      });

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findOne({
      productId: req.params.productId,
    });
    if (!configuration)
      return res.status(500).json({
        success: false,
        message: "Configuration not found !",
      });

    return res.json({
      success: true,
      configuration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getDescription = async (req, res) => {
  try {
    const description = await Description.findOne({
      productId: req.params.productId,
    });
    if (!description)
      return res.status(500).json({
        success: false,
        message: "description not found !",
      });

    return res.json({
      success: true,
      description,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const update = await Products.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        newPrice: req.body.newPrice,
        oldPrice: req.body.oldPrice,
        colors: req.body.colors,
        memorys: req.body.memorys,
        category: req.body.category,
      }
    );

    await Description.findOneAndUpdate(
      { productId: req.params.id },
      {
        contentHtml: req.body.contentHtml,
        contentMarkdown: req.body.contentMarkdown,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Update product success !",
      product: update,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const searchProduct = async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing paramaters!",
    });
  }

  try {
    const textReg = new RegExp(searchTerm, "i");
    const results = await Products.find({
      name: textReg,
    });

    return res.json({
      success: true,
      results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProducts,
  getProduct,
  getConfiguration,
  getDescription,
  updateProduct,
  searchProduct,
};
