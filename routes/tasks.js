const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const routes = require("express").Router();
const { Tasks } = require("../models");
const {
  Company,
  Users,
  UserTask
} = require("../functions/associations/tasksAssociations");

routes.get("/getAllTasks", async (req, res) => {
  const { id, offset } = req.headers;
  try {
    const users = await Users.findAll({
      where: { CompanyId: id, type: "agent" },
      offset: offset || 0,
      limit: 10,
    });
    const payload = await Tasks.findAll({
      where: { CompanyId: id },
      offset: offset || 0,
      limit: 10,
      include: [
        {
          model: Users,
        },
      ],
    });
    res
      .status(200)
      .send({ payload: payload, users: users, message: "success" });
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error" });
  }
});

// const payload = await UserTasks.findAll({
//   where: { CompanyId: id },
//   offset: offset || 0,
//   limit: 10,
//   include: [
//     {
//       model: Users,
//     },
//     {
//       model: Tasks,
//       include: [{ model: Users }],
//     },
//   ],
// });
// Users;
// res.status(200).send({ payload: payload });
// });

routes.post("/createTask", async (req, res) => {
  console.log(req.body);
  const task_code = Math.floor(100 + Math.random() * 9000);
  const {
    title,
    description,
    priority,
    deadline,
    startTime,
    startDate,
    bonus,
    userId,
    companyId,
  } = req.body;
  try {
    const payload = await Tasks.create({
      title: title,
      description: description,
      priority: priority,
      deadline: deadline,
      start_date: startDate,
      start_time: startTime,
      end_date: "pending",
      end_time: "pending",
      bonus: bonus,
      code: task_code,
      status: "pending",
      active: true,
      asignees: [],
      UserId: userId,
      CompanyId: companyId,
    });
    res.status(200).send({
      message: "success",
      payload: payload,
    });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
});

routes.post("/updateTask", async (req, res) => {
  console.log(req.body);
  const task_code = Math.floor(100 + Math.random() * 9000);
  const {
    title,
    description,
    priority,
    deadline,
    startTime,
    startDate,
    bonus,
    userId,
    companyId,
  } = req.body.data;
  try {
    const payload = await Tasks.update(
      {
        title: title,
        description: description,
        priority: priority,
        deadline: deadline,
        start_date: startDate,
        start_time: startTime,
        end_date: "pending",
        end_time: "pending",
        bonus: bonus,
        code: task_code,
        status: "pending",
        active: true,
        // asignees:
        UserId: userId,
        CompanyId: companyId,
      },
      { where: { id: req.body.taskId } }
    );
    res.status(200).send({
      message: "success",
      payload: payload,
    });
  } catch (e) {
    res.status(304).send({ message: "error", e: e });
  }
});

routes.post("/assignTask", async (req, res) => {
  try {
    console.log(req.body);
    const update = await Tasks.update(
      { asignees: req.body.asignees },
      { where: { id: req.body.taskId } }
    );
    // Find the task by taskId
    const task = await Tasks.findByPk(req.body.taskId);
    if (!task) {
      return res
        .status(404)
        .json({ message: "error", error: "Task not found" });
    }

    // Find the employees by employeeIds
    const employees = await Users.findAll({ where: { id: req.body.data } });
    if (employees.length !== req.body.data.length) {
      return res
        .status(404)
        .json({ message: "error", error: "One or more employees not found" });
    }

    // // Add the employees to the task
    await task.addUser(employees);

    return res.status(200).send({ message: "success", payload: update });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", error: e });
  }
});

routes.delete("/deleteTask", async (req, res) => {
  const { id } = req.headers;
  console.log(req.headers);
  try {
    const task = await Tasks.findByPk(id);
    if (task) {
      const employees = await Users.findAll({ where: { id: req.headers.asignees } });
      const deleteUserTasks = await task.removeUser(employees);
      if (deleteUserTasks) {
        await Tasks.destroy({ where: { id: id } });
      } else {
        console.log("none");
      }
    }
    res.status(200).send({ message: "success", task: id, error: null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "error", task: null, error: e });
  }
});

module.exports = routes;
