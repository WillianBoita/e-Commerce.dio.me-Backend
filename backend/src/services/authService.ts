import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { env } from '../config/env';

export class AuthService {
  async signup(name: string, email: string, password: string) {

    if(!env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined')
    }
    
    console.log(email)
    // problema aqui
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    console.log(userExists)

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


    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {expiresIn: '2h'})

    return { token }
  }
}
