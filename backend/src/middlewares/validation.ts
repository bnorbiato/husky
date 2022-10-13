import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const validateName = (req: Request, res:Response, next: NextFunction) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name must be a string' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (name.length < 3) {
    return res.status(400).json(
      { message: 'Name length must be at least 3 characters long' },
    );
  }

  next();
};

export const isEmailValid = (email: string) => {
  const base = /\S+@+.\S+/;
  return base.test(email);
};

export const isEmailUnique = async (primaryEmail: string) => {
  const found = await prisma.user.findUnique({
    where: {
      primaryEmail,
    },
  });
  return found === null;
};

export const validateEmail = async (req: Request, res:Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ message: 'Email must be a valid email' });
  }

  if (!await isEmailUnique(email)) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { primaryEmail } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      primaryEmail,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  next();
};