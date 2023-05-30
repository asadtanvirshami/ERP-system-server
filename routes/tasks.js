const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const routes = require("express").Router();
const { Tasks } = require("../models");
const { Company, Users } = require("../functions/associations/tasksAssociations");
const { UserTasks } = require("../functions/associations/userTaskAssociations");


routes.post("/createTask", async (req, res) => {
  const task_code =  Math.floor(100 + Math.random() * 9000);
  const {title, description, priority,deadline, startTime, startDate, bonus, userId} =req.body.data
  try {
    await Tasks.create({
      title:title,
      description:description,
      priority:priority,
      deadline:deadline,
      start_date:startDate,
      start_time:startTime,
      end_date:'pending',
      end_time:'pending',
      bonus:bonus,
      code:task_code,
      status:'pending',
      active:true,
      UserId:userId,
      CompanyId:companyId
  })
    res.status(200).send({ status: "success", message: "Task Created!" });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
});

routes.post("/AssignTask", async (req, res) => {
   console.log(req.body)
  var promises = (req.body).map((rqBody)=>{
    return Tasks.create({
        title:rqBody.title,
        description:rqBody.title,
        priority:rqBody.priority,
        deadline:rqBody.deadline,
        start_date:rqBody.startDate,
        start_time:rqBody.startTime,
        end_date:'pending',
        end_time:'pending',
        bonus:rqBody.bonus,
        code:task_code,
        status:'pending',
        active:true,
        UserId:rqBody.userId
    })
  })
  try {
    await Promise.all(promises)
    res.status(200).send({ status: "success", message: "Task Created!" });
  } catch (e) {
    res.status(304).send({ status: "error", message: "Error Occured" });
    console.log("Error Occured", e);
  }
});

module.exports = routes;
