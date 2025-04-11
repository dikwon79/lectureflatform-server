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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Course 생성
        const course = yield prisma.course.create({
            data: {
                id: "3a9f3d6c-c391-4b1c-9c3d-6c3f3d6c3f3d",
                teacherId: "user_7kFh92JkCpQw3N8M5L4xRzVtYs",
                teacherName: "John Doe",
                title: "Introduction to Programming",
                description: "Learn the basics of programming with this comprehensive course.",
                category: "Computer Science",
                image: "https://images.pexels.com/photos/5905888/pexels-photo-5905888.jpeg",
                price: 4999,
                level: "Beginner",
                status: "Published",
            },
        });
        // 2. Section 생성
        const section = yield prisma.section.create({
            data: {
                id: "2f9d1e8b-5a3c-4b7f-9e6d-8c2a1f0b3d5e",
                courseId: course.id,
                sectionTitle: "Getting Started",
                sectionDescription: "Learn the basics of programming and set up your development environment.",
            },
        });
        // 3. Chapter 생성
        const chapter = yield prisma.chapter.create({
            data: {
                id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
                sectionId: section.id,
                type: "Video",
                title: "Welcome to Programming",
                content: "https://example.com/videos/welcome.mp4",
                video: "https://example.com/videos/welcome.mp4",
            },
        });
        // 4. Comment 생성
        yield prisma.comment.create({
            data: {
                id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
                chapterId: chapter.id,
                userId: "emma.wilson@hotmail.com",
                text: "Great introduction!",
                timestamp: "2023-03-10T09:15:00Z",
            },
        });
        // 5. Enrollment 생성
        yield prisma.enrollment.createMany({
            data: [
                {
                    userId: "user_2ntu96pUCljUV2T9W0AThzjacQB",
                    courseId: course.id,
                },
                {
                    userId: "user_9xWp45MnKjL8vRt2Hs6BqDcEy",
                    courseId: course.id,
                },
            ],
        });
        console.log("✅ Seed data created successfully.");
    });
}
main()
    .catch((e) => {
    console.error("❌ Failed to seed data:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
