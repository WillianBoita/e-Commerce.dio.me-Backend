import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authService";

const router = Router();

const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/signup', authController.signup)

export default router;