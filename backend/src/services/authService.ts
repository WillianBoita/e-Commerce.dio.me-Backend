import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if(userExists) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email, 
        password: hashPassword
      }
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '2h'})

    return { token }
  }
}
