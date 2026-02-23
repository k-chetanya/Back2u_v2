import { Item } from "../models/item.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


export const createItem = async (req, res) => {
  try {
    const { title, description, type, category, location } = req.body;

    if (!title || !description || !type || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = "";
if (req.file) {
  console.log("=== FILE DEBUG START ===");
  console.log("FILE:", req.file);
  console.log("MIME:", req.file?.mimetype);
  console.log("NAME:", req.file?.originalname);
  console.log("SIZE:", req.file?.size);

  const fileUri = getDataUri(req.file);

  console.log(
    "DATA URI START:",
    fileUri.content.substring(0, 80)
  );

  const cloudRes = await cloudinary.uploader.upload(
    fileUri.content,
    { folder: "lost-found-items" }
  );

  imageUrl = cloudRes.secure_url;
}

    const item = await Item.create({
      title,
      description,
      type,
      category,
      location,
      image: imageUrl,
      user: req.user._id,
      userEmail: req.user.email,
    });

    return res.status(201).json({
      success: true,
      message: "Item posted successfully",
      item,
    });

  } catch (error) {
    console.error("CREATE ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create item",
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const { type, category, search } = req.query;

    let query = {};

    if (type) query.type = type; // lost / found
    if (category) query.category = category;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName");

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("GET ITEMS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch items",
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("GET ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch item",
    });
  }
};

export const resolveItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user._id; // from auth middleware

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Authorization check
    if (item.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to resolve this item",
      });
    }

    // Already resolved
    if (item.isResolved) {
      return res.status(400).json({
        success: false,
        message: "Item already resolved",
      });
    }

    item.isResolved = true;
    item.resolvedAt = new Date();
    item.resolvedBy = userId;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item marked as resolved",
      item,
    });
  } catch (error) {
    console.error("RESOLVE ITEM ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // comes from auth middleware

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // owner check
    if (item.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this item",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update item",
    });
  }
};

export const getMyItems = async (req,res) => {
    try {
      const items = await Item.find({user: req.user._id}).sort({createdAt: -1});
      res.status(200).json({
        success:true,
        items,
      })
      
    } catch (error) {
       console.log(error)
       res.status(500).json({
        success:false,
        message:"Failed to fetch user items",
       });
    }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalItems = await Item.countDocuments({ user: userId });
    const resolvedItems = await Item.countDocuments({
      user: userId,
      isResolved: true,
    });

    const activeItems = totalItems - resolvedItems;

    return res.status(200).json({
      success: true,
      stats: {
        totalItems,
        resolvedItems,
        activeItems,
      },
    });
  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);
    res.status(500).json({ success: false });
  }
};
