import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken'
import  {comparePassword, hashPassword}  from '../helper/authHelper.js';
dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { username, name, email, password, contactNumber } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      username,
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    const savedUser = await newUser.save();

    res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    //check user
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token =  JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        username:user.username,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
