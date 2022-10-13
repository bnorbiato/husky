import express from "express";

import db from "../db";

export const moveContact = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const contactId = id ? parseInt(id) : 0;
  const { position, userId } = req.body;

  try {
    const allContacts = await db.contact.findMany({
      where: {
        userId,
        NOT: {
          id: contactId,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    let newPos = parseFloat(position);
    if (newPos <= 0) {
      newPos = allContacts[0].position - 1;
    } else if (newPos >= allContacts.length) {
      newPos = allContacts[allContacts.length - 1].position + 1;
    } else {
      newPos =
        (allContacts[newPos].position + allContacts[newPos - 1].position) / 2;
    }

    const contact = await db.contact.update({
      where: {
        id: contactId,
      },
      data: {
        position: newPos,
      },
    });

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(400).json({ error, data: { contactId } });
  }
};
