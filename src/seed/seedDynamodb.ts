import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function seedData(modelName: string, filePath: string) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Seeding data into model: ${modelName}`);

  try {
    for (const item of data) {
      await (prisma as any)[modelName].create({ data: item });
    }

    console.log(`✅ Successfully seeded data into: ${modelName}`);
  } catch (error) {
    console.error(`❌ Failed to seed data into ${modelName}:`, error);
  }
}

export default async function seed() {
  const seedDataPath = path.join(__dirname, "./data");
  const files = fs
    .readdirSync(seedDataPath)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const modelName = path.basename(file, ".json");
    const filePath = path.join(seedDataPath, file);

    await seedData(modelName, filePath);
  }

  await prisma.$disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error("Failed to run seed script:", err);
    process.exit(1);
  });
}
