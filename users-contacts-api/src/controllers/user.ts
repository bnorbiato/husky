import express from "express";

import db from "../db";

export const getUser = async (
  req: express.Request,
  res: express.Response
) => {
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
