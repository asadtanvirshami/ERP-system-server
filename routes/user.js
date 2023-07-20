const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require("../models");

routes.get("/getAllAgents", async (req, res) => {
  const { id } = req.headers;
  const page = parseInt(req.headers.page) || 0;
  const limit = parseInt(req.headers.limit) || 5;
  
  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;

  try {
    const totalItems = await Users.count({ where: { type: "agent", CompanyId: id } });
    const agents = await Users.findAll({ 
      where: { type: "agent", CompanyId: id },
      offset: offset,
      limit: limit,
    });
    res.status(200).send({ payload: agents,totalItems:totalItems,  message:'success' });
  } catch (e) {
    res.status(500).send({  message:'error'});
  }
});

routes.post("/updateAgent", async (req, res) => {
  console.log(req.body);
  const { data, id } = req.body;
  try {
    const payload = await Users.update(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        type: data.type,
        designation: data.designation,
        signature: "pending",
        CompanyId: data.CompanyId,
      },
      { where: { id: id } }
    );
    res.status(200).send({ message: "success", payload: payload });
  } catch (e) {
    console.log(e);
    res.json({
      message: "error",
      message: "Something Went Wrong Please Try Again",
    });
  }
});

routes.delete("/deleteAgent", async (req, res) => {
  const id = req.headers.id;
  try {
    const payload = await Users.destroy({
      where: { id: `${id}` },
      force: true,
    });
    res.status(200).send({ status: "success", payload: payload });
  } catch (e) {
    console.log(e);
    res.json({
      message: "error",
      message: "Something Went Wrong Please Try Again",
    });
  }
});

module.exports = routes;
