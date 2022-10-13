import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const person = await prisma.person.createMany({
    data: [
      {
        firstName: "Chovy",
        lastName: "Geng",
        email: "chovy@email.com"
      },
    ],
  });

  await prisma.contact.createMany({
    data: [
      {
        personId: 1,
        name: "Faker",
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
