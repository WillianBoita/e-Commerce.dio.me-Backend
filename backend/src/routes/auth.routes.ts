import { Router } from "express";

const router = Router();

router.post('login', authController.login)
router.post('signup', authController.signup)