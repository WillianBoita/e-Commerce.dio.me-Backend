import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {

  }

  signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if(!name || !email || !password) {
        return res.status(400).json({ error: "credenciais inválidas"});
      }

      const response = await this.authService.signup(name, email, password);

      return res.status(201).json(response)
    }
    catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if(!email || !password) {
        return res.status(400).json({ error: "credenciais inválidas"});
      }

      const response = await this.authService.login(email, password)

      return res.status(200).json(response)
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}