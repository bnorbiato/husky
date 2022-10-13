import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const users = await prisma.user.createMany({
    data: [
      {
        firstName: "Chovy",
        lastName: "Geng",
        primaryEmail: "chovy@email.com"
      },
    ],
  });

  await prisma.contact.createMany({
    data: [
      {
        userId: 1,
        type: "Instagram",
        content: "@chovy",
        position: 1
      },
    ],
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
