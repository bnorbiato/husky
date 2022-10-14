import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getPeople = async (_req: Request, res: Response) => {
  const people = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      contacts: true,
    },
  });
  
  return res.status(200).json(people);
};

export const createPerson = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const created = await prisma.person.create({
    data: {
      name,
      email,
    },
  });
  return res.status(201).json(created);
};

export const getPerson = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await prisma.person.findUnique({
    where: {
      email,
    }
  });
  return res.status(200).json(user);
};

export const updatePerson = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { name, lastName } = req.body;

  const user = await prisma.person.update({
    where: {
      email,
    },
    data: {
      name,
    },
  });

  return res.status(200).json(user);
};

export const deletePerson = async (req: Request, res: Response) => {
  const { email } = req.params;
  await prisma.person.delete({
    where: {
      email,
    },
  });
  return res.status(204).end();
};