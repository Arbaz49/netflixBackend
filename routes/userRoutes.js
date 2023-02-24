import express from 'express';
import  {Register,Login,protect, getUser,UpdateUser} from "../controllers/userControllers.js"

const router=express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/getuser").get(protect,getUser);
router.route("/update/:id").post(protect,UpdateUser)


export default router