
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';



// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET_KEY
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }
    console.log(token)

    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    console.log('Decoded user information:', decoded);

    console.log(req.user = {
      userId: decoded._id, 
    });
    req.user = {
      userId: decoded._id
    };

    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};



//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};