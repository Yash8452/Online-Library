import express from "express";
import  { loginController, registerController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER 
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);


//test routes
//router.get("/test", requireSignIn, isAdmin,);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



export default router;