import express from "express";

import db from "../db";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      primaryEmail: true,
    },
  });

  return res.status(200).json(users);
};

export const getUserById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const userId = id ? parseInt(id) : 0;

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: "User not found." });
  }
};

export const createUser = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, primaryEmail } = req.body;
  const created = await db.user.create({
    data: {
      firstName,
      lastName,
      primaryEmail,
    },
  });
  return res.status(201).json(created);
};

export const getUserByName = async (req: express.Request, res: express.Response) => {
  const { searchString }: { searchString?: string} = req.query;

  const filteredPosts = await db.user.findMany({
    where: {
      firstName: {
        contains: searchString,
        mode: 'insensitive',
      },
    },
  });

  return res.status(200).json(filteredPosts);
};

export const deleteUserById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const userId = id ? parseInt(id) : 0;

  await db.user.delete({
    where: {
      id: userId,
    },
  });
  return res.status(204).end();
};

export const updateUserById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const userId = id ? parseInt(id) : 0;
  const { firstName, lastName, primaryEmail } = req.body;

  const user = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName,
      lastName,
      primaryEmail
    },
  });

  return res.status(200).json(user);
};