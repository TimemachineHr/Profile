import prisma from "../config/db.config.js";
import axios from "axios";

class TaskController {
  static async index(req, res) {
    try {
      const tasks = await prisma.task.findMany({});
      return res.json({ tasks });
    } catch (error) {
      console.log("the task fetch error is", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { time, description } = req.body;
      const task = await prisma.task.create({
        data: {
          user_id: authUser.id,
          time,
          description,
        },
      });

      return res.json({ message: "Task created successfully!", task });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
}

export default TaskController;
