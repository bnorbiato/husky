import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTypes = async (_req: Request, res: Response) => {
  const types = await prisma.type.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      content: true,
      contact: true,
    },
  });

  return res.status(200).json(types);
};

export const createType = async (req: Request, res: Response) => {
  const { title, content, contact } = req.body;
  const created = await prisma.type.create({
    data: {
      title,
      content,
      contact,
    },
  });
  return res.status(201).json(created);
};
