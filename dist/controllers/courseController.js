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
exports.getCourse = exports.listCourses = void 0;
const db_1 = __importDefault(require("../lib/db"));
const listCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryParam = Array.isArray(req.query.category)
            ? req.query.category[0]
            : req.query.category;
        const category = typeof categoryParam === "string" ? categoryParam : undefined;
        const courses = category && category !== "all"
            ? yield db_1.default.course.findMany({
                where: { category },
            })
            : yield db_1.default.course.findMany();
        res.json({ message: "Courses retrieved successfully", data: courses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve courses", error });
    }
});
exports.listCourses = listCourses;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const course = yield db_1.default.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.json({
            message: "Course retrieved successfully",
            data: course,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving course", error });
    }
});
exports.getCourse = getCourse;
