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
  res.status(200).send({ payload: payload });
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
    res
      .status(200)
      .send({
        status: "success",
        message: "Task is successfully created!",
        payload: payload,
      });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
});

// routes.post("/createTask", async (req, res) => {
//   console.log(req.body);
//   const task_code = Math.floor(100 + Math.random() * 9000);
//   const {
//     title,
//     description,
//     priority,
//     deadline,
//     startTime,
//     startDate,
//     bonus,
//     userId,
//     companyId,
//   } = req.body;
//   try {
//     const payload = await Tasks.update({
//       title: title,
//       description: description,
//       priority: priority,
//       deadline: deadline,
//       start_date: startDate,
//       start_time: startTime,
//       end_date: "pending",
//       end_time: "pending",
//       bonus: bonus,
//       code: task_code,
//       status: "pending",
//       active: true,
//       UserId: userId,
//       CompanyId: companyId,
//     });
//     res
//       .status(200)
//       .send({
//         status: "success",
//         message: "Task is successfully created!",
//         payload: payload,
//       });
//   } catch (e) {
//     res.status(304).send({ status: "error", message: "Error Occured" });
//     console.log("Error Occured", e);
//   }
// });

routes.post("/assignTask", async (req, res) => {
  console.log(req.body);
  await Tasks.update({asignees:req.body.asignees},{where:{id:req.body.taskId}})
  var promises = await req.body.data.map((rqBody) => {
    return UserTasks.create({
      UserId: rqBody.userId,
      CompanyId: rqBody.companyId,
      TaskId: rqBody.taskId,
    });
  });
  try {
    await Promise.all(promises);
    res
      .status(200)
      .send({ status: "success", message: "Task is successfully assigned!" });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
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
