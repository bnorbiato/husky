import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      primaryEmail: true
    },
  });
  
  return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, primaryEmail } = req.body;
  const created = await prisma.user.create({
    data: {
      firstName,
      lastName,
      primaryEmail,
    },
  });
  return res.status(201).json(created);
};

export const getUser = async (req: Request, res: Response) => {
  const { primaryEmail } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      primaryEmail,
    }
  });
  return res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { primaryEmail } = req.params;
  const { firstName, lastName } = req.body;

  const user = await prisma.user.update({
    where: {
      primaryEmail,
    },
    data: {
      firstName,
      lastName,
    },
  });

  return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { primaryEmail } = req.params;
  await prisma.user.delete({
    where: {
      primaryEmail,
    },
  });
  return res.status(204).end();
};