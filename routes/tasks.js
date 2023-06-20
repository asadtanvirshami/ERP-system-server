const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const routes = require("express").Router();
const { Tasks } = require("../models");
const {
  Company,
  Users,
} = require("../functions/associations/tasksAssociations");
const { UserTasks } = require("../functions/associations/userTaskAssociations");

routes.get("/getAllTasks", async (req, res) => {
  const { id, offset } = req.headers;
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
  res.status(200).send({ payload: payload, users: users });
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
      UserId: userId,
      CompanyId: companyId,
    });
    res.status(200).send({
      status: "success",
      message: "Task is successfully created!",
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
  } = req.body;
  try {
    const payload = await Tasks.update({
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
      UserId: userId,
      CompanyId: companyId,
    });
    res.status(200).send({
      status: "success",
      message: "Task is successfully created!",
      payload: payload,
    });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
});

routes.post("/assignTask", async (req, res) => {
  try {
    console.log(req.body)
    await Tasks.update(
        { asignees: req.body.asignees },
        { where: { id: req.body.taskId } }
      );
    // Find the task by taskId
    const task = await Tasks.findByPk(req.body.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Find the employees by employeeIds
    const employees = await Users.findAll({ where: { id: req.body.data } });
    if (employees.length !== req.body.data.length) {
      return res.status(404).json({ error: 'One or more employees not found' });
    }

    // Add the employees to the task
    await task.addUsers(employees);

    return res.status(200).json({ message: 'Employees added to the task successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  // console.log(req.body);
  // await Tasks.update(
  //   { asignees: req.body.asignees },
  //   { where: { id: req.body.taskId } }
  // );
  // const Tasks = await UserTasks.findAll({})
  // var promises = await req.body.data.map((rqBody) => {
  //   return UserTasks.create({
  //     UserId: rqBody.userId,
  //     CompanyId: rqBody.companyId,
  //     TaskId: rqBody.taskId,
  //   });
  // });
  // try {
  //   await Promise.all(promises);
  //   res
  //     .status(200)
  //     .send({ status: "success", message: "Task is successfully assigned!" });
  // } catch (e) {
  //   res.status(304).send({ status: "error", message: "Error Occured" });
  //   console.log("Error Occured", e);
  // }
});

routes.post("/assignTask", async (req, res) => {
  try {
    console.log(req.body)
    await Tasks.update(
        { asignees: req.body.asignees },
        { where: { id: req.body.taskId } }
      );
    // Find the task by taskId
    const task = await Tasks.findByPk(req.body.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Find the employees by employeeIds
    const employees = await Users.findAll({ where: { id: req.body.data } });
    if (employees.length !== req.body.data.length) {
      return res.status(404).json({ error: 'One or more employees not found' });
    }

    // Add the employees to the task
    await task.removeUsers(employees);

    return res.status(200).json({ message: 'Employees added to the task successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  // console.log(req.body);
  // await Tasks.update(
  //   { asignees: req.body.asignees },
  //   { where: { id: req.body.taskId } }
  // );
  // const Tasks = await UserTasks.findAll({})
  // var promises = await req.body.data.map((rqBody) => {
  //   return UserTasks.create({
  //     UserId: rqBody.userId,
  //     CompanyId: rqBody.companyId,
  //     TaskId: rqBody.taskId,
  //   });
  // });
  // try {
  //   await Promise.all(promises);
  //   res
  //     .status(200)
  //     .send({ status: "success", message: "Task is successfully assigned!" });
  // } catch (e) {
  //   res.status(304).send({ status: "error", message: "Error Occured" });
  //   console.log("Error Occured", e);
  // }
});

routes.delete("/deleteTask", async (req, res) => {
  const id = req.headers.id;
  try {
    const payload = await Tasks.destroy({
      where: { id: `${id}` },
      force: true,
    });
    await UserTasks.destroy({
      where: { TaskId: `${id}` },
      force: true,
    });
    res.status(200).send({ status: "success", payload: payload });
  } catch (e) {
    console.log(e);
  }
});



module.exports = routes;
