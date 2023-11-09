import express from 'express';
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
const router = express.Router();

// middleware route
router.use("/changepassword", checkUserAuth);

// public routes
router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);

// protected routes
router.post("/changepassword", userController.chageUserPassword);



export default router