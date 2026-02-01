import { User } from "../models/user.model.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res
  .status(200)
  .cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,        // ✅ REQUIRED (HTTPS)
    sameSite: "None",    // ✅ REQUIRED (cross-site)
  })
  .json({
    success: true,
    message: `Welcome back ${user.firstName}`,
    user,
  });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const logout = async(_,res) => {
    try {
        return res
  .status(200)
  .cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  })
  .json({
    success: true,
    message: "Logout successfully",
  });

    } catch (error) {
        console.log(error);       
    }
};


export const getMe = async (req, res) => {
  try {
    // req.user is already attached by isAuthenticated middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      firstName,
      lastName,
      bio,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      bio,
      instagram,
      linkedin,
      facebook,
    };

    // AVATAR UPLOAD (OPTIONAL)
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadRes = await cloudinary.uploader.upload(
        fileUri.content,
        {
          folder: "avatars",
          transformation: [{ width: 300, height: 300, crop: "fill" }],
        }
      );

      updateData.avatar = uploadRes.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};



