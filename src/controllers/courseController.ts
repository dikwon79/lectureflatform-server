import { Request, Response } from "express";
import db from "../lib/db";

export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryParam = Array.isArray(req.query.category)
      ? req.query.category[0]
      : req.query.category;

    const category =
      typeof categoryParam === "string" ? categoryParam : undefined;

    const courses =
      category && category !== "all"
        ? await db.course.findMany({
            where: { category },
          })
        : await db.course.findMany();

    res.json({ message: "Courses retrieved successfully", data: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve courses", error });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await db.course.findUnique({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving course", error });
  }
};
