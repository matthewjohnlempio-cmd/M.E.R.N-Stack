import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/* CREATE (REGISTER) */
export const create = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};


/* READ ALL */
export const getAllUsers = async (_, res) => {
  try {
    res.status(200).json(await User.find().select("-password"));
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

/* READ ONE */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

/* UPDATE */
export const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

/* DELETE */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!(await User.findByIdAndDelete(id))) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};
