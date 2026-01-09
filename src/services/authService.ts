import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { env } from '../config/env';
import { generateToken } from '../utils/generateToken';

export class AuthService {
  async signup(name: string, email: string, password: string) {

    if(!env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined')
    }
    
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


    const token = generateToken(user.id)

    return { token }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
  
    if (!user) {
      throw new Error('Incorrect credentials');
    }
  
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );
  
    if (!passwordMatch) {
      throw new Error('Incorrect credentials');
    }
  
    const token = generateToken(user.id)

    return { user, token };
  }
  
}
