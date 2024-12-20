import { PrismaClient, SubscriptionType } from "@prisma/client";

const prisma = new PrismaClient();

const subscriptionTypes = [
  { type: SubscriptionType.FREE, name: "Free Plan", amount: 0 },
  { type: SubscriptionType.PRO, name: "Pro Plan", amount: 399 },
  { type: SubscriptionType.PREMIUM, name: "Premium Plan", amount: 2499 },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const subscription of subscriptionTypes) {
    await prisma.subscriptionSeed.upsert({
      where: {
        type: subscription.type,
      },
      update: {
        name: subscription.name,
        amount: subscription.amount,
      },
      create: {
        id: subscription.type,
        type: subscription.type,
        name: subscription.name,
        amount: subscription.amount,
      },
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
