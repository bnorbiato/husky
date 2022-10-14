import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getContacts = async (_req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany({
    select: {
      id: true,
      createdAt: true,
      name: true,
      person: true,
      types: true,
    },
  });

  return res.status(200).json(contacts);
};

export const createContact = async (req: Request, res: Response) => {
  const { name, person } = req.body;
  const created = await prisma.contact.create({
    data: {
      name,
      person,
    },
  });
  return res.status(201).json(created);
};

export const getContact = async (req: Request, res: Response) => {
  const { name } = req.params;

  const contact = await prisma.contact.findUnique({
    where: {
      name,
    },
  });
  return res.status(200).json(contact);
};

export const updateContact = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { person } = req.body;

  const user = await prisma.contact.update({
    where: {
      name,
    },
    data: {
      person
    },
  });

  return res.status(200).json(user);
};

export const deleteContact = async (req: Request, res: Response) => {
  const { name } = req.params;
  await prisma.contact.delete({
    where: {
      name,
    },
  });
  return res.status(204).end();
};
