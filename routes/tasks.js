const Sequelize = require("sequelize");

const routes = require("express").Router();
const { Tasks } = require("../models");
const {
  Users,
} = require("../functions/associations/tasksAssociations");
const { UserTasks } = require("../functions/associations/userTaskAssociations");

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
  console.log(req.body);
  const existsUserTasks = await UserTasks.findAll({
    where: { TaskId: req.body.taskId },
  });

  console.log(existsUserTasks, "user");

  const usersToFilter = existsUserTasks.map((userTask) => userTask.UserId);

  const filteredUsers = req.body.asignees.filter(
    (userId) => !usersToFilter.includes(userId.id)
  );

  console.log(filteredUsers, "filteredUsers");

  const promises = filteredUsers.map((rqBody) => {
    return UserTasks.create({
      UserId: rqBody.id,
      CompanyId: req.body.companyId,
      TaskId: req.body.taskId,
    });
  });

  try {
    await Promise.all(promises);
    const update = await Tasks.update(
      { asignees: req.body.asignees },
      { where: { id: req.body.taskId } }
    );
    return res.status(200).send({ message: "success", payload: update });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", error: e });
  }
});

routes.delete("/deleteUserTask", async (req, res) => {
  const { id, taskid } = req.headers;
  console.log(req.headers);
  try {
    const Task = await Tasks.findOne({ where: { id: taskid } });
    console.log(Task.asignees)
    if (Task) {
      const updatedAsignees = Task.asignees.filter((x) => x.id !== id);
      await Tasks.update({ asignees: updatedAsignees},{ where: { id: taskid } });
    }
    const DeleteUserTask = await UserTasks.destroy({ where: { UserId: id } });
    if (DeleteUserTask) {
      res
        .status(200)
        .send({
          message: "success",
          payload: "successfully deleted",
          error: null,
        });
    } else {
      res.status(404).send({ message: "error", payload: null, error: "error" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "error", payload: null, error: e });
  }
});

routes.delete("/deleteTask", async (req, res) => {
  const { id } = req.headers;
  console.log(req.headers);
  try {
    const task = await Tasks.findByPk(id);
    if (task) {
      await UserTasks.destroy({ where: { TaskId: id } });
      await Tasks.destroy({ where: { id: id } });
      res.status(200).send({ message: "success", task: id, error: null });
    } else {
      res.status(200).send({ message: "error", task: null, error: null });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "error", task: null, error: e });
  }
});

module.exports = routes;
