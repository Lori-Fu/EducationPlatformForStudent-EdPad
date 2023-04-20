import { Router } from "express";
const router = Router();
import path from "path";
import { assignmentFunc } from "../data/index.js";

router.get("/:id/assignment", async (req, res) => {
  try {
    const courseId = req.params.id;
    const assignmentList = await assignmentFunc.getAllAssignment(courseId);
    // const role = req.session.role;
    let faculty = true;
    // if (role === "faculty") {
    //   faculty = true;
    // }
    return res.render("assignment/assignment", {
      title: "All Assignment",
      courseId: courseId,
      assignmentList: assignmentList,
      faculty: faculty,
    });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

router
  .route("/:id/newAssignment")
  .get(async (req, res) => {
    try {
      //   if (req.session.role !== "faculty") {
      //     return res.redirect(`/course/${id}/assignment`);
      //   }
      const id = req.params.id;
      return res.render("assignment/newAssignment", { courseId: id });
    } catch (e) {
      return res.json({ error: e });
    }
  })
  .post(async (req, res) => {
    //   if (req.session.role !== "faculty") {
    //     return res.redirect(`/course/${id}/assignment`);
    //   }
    const courseId = req.params.id;
    const title = req.body.title.trim();
    const dueDate = req.body.dueDate.trim();
    const content = req.body.content.trim();
    const file = req.body.file.trim();
    const score = req.body.score.trim();
    try {
      await assignmentFunc.createAssignment(
        title,
        courseId,
        dueDate,
        content,
        file,
        score
      );
      return res.redirect(`/course/${courseId}/assignment`);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

export default router;