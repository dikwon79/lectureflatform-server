"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seed;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
function seedData(modelName, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        console.log(`Seeding data into model: ${modelName}`);
        try {
            for (const item of data) {
                yield prisma[modelName].create({ data: item });
            }
            console.log(`✅ Successfully seeded data into: ${modelName}`);
        }
        catch (error) {
            console.error(`❌ Failed to seed data into ${modelName}:`, error);
        }
    });
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const seedDataPath = path_1.default.join(__dirname, "./data");
        const files = fs_1.default
            .readdirSync(seedDataPath)
            .filter((file) => file.endsWith(".json"));
        for (const file of files) {
            const modelName = path_1.default.basename(file, ".json");
            const filePath = path_1.default.join(seedDataPath, file);
            yield seedData(modelName, filePath);
        }
        yield prisma.$disconnect();
    });
}
if (require.main === module) {
    seed().catch((err) => {
        console.error("Failed to run seed script:", err);
        process.exit(1);
    });
}
