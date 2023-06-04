const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require("../models");
const {
  Sales,
  Clients,
} = require("../functions/associations/clientAssociations");

routes.get("/getAllClients", async (req, res) => {
  const { id, offset } = req.headers;

  const payload = await Clients.findAll({
    where: { CompanyId: id },
    offset: offset || 0,
    limit: 10,
  });
  res.status(200).send({ payload: payload });
});

routes.post("/createClient", async (req, res) => {
  console.log(req.body);
  const { data, id } = req.body;
  try {
    const payload = await Clients.create(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        country: data.country,
        city: data.city,
        source: data.source,
        source_link: data.source_link,
        comments: data.comments,
        CompanyId: id,
      },
    );
    res.status(200).send({ message: "success", payload: payload });
  } catch (e) {
    res.json({
      status: "error",
      message: "Something Went Wrong Please Try Again",
    });
  }
});

routes.post("/updateClient", async (req, res) => {
  console.log(req.body);
  const { data, id } = req.body;
  try {
    const payload = await Clients.update(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        country: data.country,
        city: data.city,
        source: data.source,
        source_link: data.source_link,
        comments: data.comments,
        CompanyId: data.CompanyId,
      },
      { where: { id: id } }
    );
    res.status(200).send({ message: "success", payload: payload });
  } catch (e) {
    console.log(e)
    res.json({
      status: "error",
      message: "Something Went Wrong Please Try Again",
    });
  }
});

routes.delete("/deleteClient", async (req, res) => {
  const id = req.headers.id;
  try {
    const payload = await Clients.destroy({
      where: { id: `${id}` },
      force: true,
    });
    res.status(200).send({ status: "success", payload: payload });
  } catch (e) {
    console.log(e);
  }
});

module.exports = routes;
