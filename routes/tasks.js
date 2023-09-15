const Sequelize = require("sequelize");

const routes = require("express").Router();
const { Tasks } = require("../models");
const { Users } = require("../functions/associations/tasksAssociations");
const { UserTasks } = require("../functions/associations/userTaskAssociations");

routes.get("/api/getAllTasks", async (req, res) => {
  const { id } = req.headers;
  const page = parseInt(req.headers.page) || 0;
  const limit = parseInt(req.headers.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;
  
  try {
    const totalItems = await Tasks.count({
      where: {CompanyId: id },
    });
    const payload = await Tasks.findAll({
      where: { CompanyId: id },
      offset: offset,
      limit: limit || 10,
      include: [
        {
          model: Users,
        },
      ],
    });
    
    res
      .status(200)
      .send({ payload: payload, totalItems: totalItems, message: "success" });
  } catch (e) {
    console.log("error", e);
    res.status(500).send({ message: "error" });
  }
});

routes.post("/api/createTask", async (req, res) => {
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
    asignees,
    isCheck
  } = req.body;

  try {
    const taskPayload = {
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
      asignees:asignees,
      UserId: userId,
      CompanyId: companyId,
    };

    const createdTask = await Tasks.create(taskPayload);

    const existsUserTasks = await UserTasks.findAll({
      where: { TaskId: createdTask.id },
    });

    const usersToFilter = existsUserTasks.map((userTask) => userTask.UserId);

    const filteredUsers = asignees.filter(
      (userId) => !usersToFilter.includes(userId.id)
    );

    const assignedUser =  filteredUsers.map((rqBody) => {
      return {
        id: rqBody.id,
        email: rqBody.email,
      };
    });

    const promises = filteredUsers.map((rqBody) => {
      return UserTasks.create({
        UserId: rqBody.id,
        CompanyId: companyId,
        TaskId: createdTask.id,
      });
    });

    await Promise.all(promises);

    const update = await Tasks.update(
      { asignees: assignedUser },
      { where: { id: createdTask.id } }
    );

    return res.status(200).send({
      message: "success",
      taskPayload: createdTask,
      assignedUsers: filteredUsers,
      updatePayload: update,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", error: e });
  }
});

routes.post("/api/updateTask", async (req, res) => {
  console.log(req.body);
  const task_code = Math.floor(100 + Math.random() * 9000);
  const {
    id,
    title,
    description,
    priority,
    deadline,
    startTime,
    startDate,
    bonus,
    userId,
    companyId,
    asignees,
    isCheck
  } = req.body.data;

  try {
    const taskPayload = {
      id: id,
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
      asignees: asignees,
      UserId: userId,
      CompanyId: companyId,
    };

    console.log('asignees', asignees);

    const createdTask = await Tasks.update(taskPayload, { where: { id: id } });

    const existsUserTasks = await UserTasks.findAll({
      where: { TaskId: id },
    });

    const usersToFilter = existsUserTasks.map((userTask) => userTask.UserId);

    // Find new asignees (those not in existsUserTasks)
    const newAsignees = isCheck.filter(
      (userId) => !usersToFilter.includes(userId)
    );

    // Find removed asignees (those in existsUserTasks but not in req.body.asignees)
    const removedAsignees = usersToFilter.filter(
      (userId) => !isCheck.includes(userId)
    );

    // Create new UserTasks records for new asignees
    const newAsigneesPromises = await newAsignees.map((userId) => {
      return UserTasks.create({
        UserId: userId,
        CompanyId: companyId,
        TaskId: id,
      });
    });

    // Remove UserTasks records for removed asignees
    const removedAsigneesPromises = await removedAsignees.map((userId) => {
      return UserTasks.destroy({
        where: {
          TaskId: id,
          UserId: userId,
        },
      });
    });

    await Promise.all([...newAsigneesPromises, ...removedAsigneesPromises]);

    const update = await Tasks.update(
      { asignees: asignees },
      { where: { id: id } }
    );

    return res.status(200).send({
      message: "success",
      taskPayload: createdTask,
      assignedUsers: asignees,
      updatePayload: update,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", error: e });
  }
});


routes.post("/api/assignTask", async (req, res) => {
  console.log(req.body);
  const existsUserTasks = await UserTasks.findAll({
    where: { TaskId: req.body.taskId },
  });

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

routes.delete("/api/deleteUserTask", async (req, res) => {
  const { id, taskid } = req.headers;
  console.log(req.headers);
  try {
    const Task = await Tasks.findOne({ where: { id: taskid } });
    if (Task) {
      const updatedAsignees = Task.asignees.filter((x) => x.id !== id);
      await Tasks.update(
        { asignees: updatedAsignees },
        { where: { id: taskid } }
      );
    }
    const DeleteUserTask = await UserTasks.destroy({ where: { UserId: id } });
    if (DeleteUserTask) {
      res.status(200).send({
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

routes.delete("/api/deleteTask", async (req, res) => {
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


// routes.post("/api/createTask", async (req, res) => {
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
//     const payload = await Tasks.create({
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
//       asignees: [],
//       UserId: userId,
//       CompanyId: companyId,
//     });
//     res.status(200).send({
//       message: "success",
//       payload: payload,
//     });
//   } catch (e) {
//     res.status(304).send({ status: "error", message: "Error Occured" });
//     console.log("Error Occured", e);
//   }
// });



// routes.post("/api/assignTask", async (req, res) => {
//   console.log(req.body);
//   const existsUserTasks = await UserTasks.findAll({
//     where: { TaskId: req.body.taskId },
//   });

//   const usersToFilter = existsUserTasks.map((userTask) => userTask.UserId);

//   const filteredUsers = req.body.asignees.filter(
//     (userId) => !usersToFilter.includes(userId.id)
//   );

//   console.log(filteredUsers, "filteredUsers");

//   const promises = filteredUsers.map((rqBody) => {
//     return UserTasks.create({
//       UserId: rqBody.id,
//       CompanyId: req.body.companyId,
//       TaskId: req.body.taskId,
//     });
//   });

//   try {
//     await Promise.all(promises);
//     const update = await Tasks.update(
//       { asignees: req.body.asignees },
//       { where: { id: req.body.taskId } }
//     );
//     return res.status(200).send({ message: "success", payload: update });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ message: "error", error: e });
//   }
// });


// routes.post("/api/updateTask", async (req, res) => {
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
//   } = req.body.data;
//   try {
//     const payload = await Tasks.update(
//       {
//         title: title,
//         description: description,
//         priority: priority,
//         deadline: deadline,
//         start_date: startDate,
//         start_time: startTime,
//         end_date: "pending",
//         end_time: "pending",
//         bonus: bonus,
//         code: task_code,
//         status: "pending",
//         active: true,
//         // asignees:
//         UserId: userId,
//         CompanyId: companyId,
//       },
//       { where: { id: req.body.taskId } }
//     );
//     res.status(200).send({
//       message: "success",
//       payload: payload,
//     });
//   } catch (e) {
//     res.status(304).send({ message: "error", e: e });
//   }
// });