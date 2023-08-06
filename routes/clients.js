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

routes.get("/api/getAllClients", async (req, res) => {
  const { id } = req.headers;

  const page = parseInt(req.headers.page) || 0;
  const limit = parseInt(req.headers.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;

  try {
    const totalItems = await Clients.count({
      where: {CompanyId: id },
    });
    const payload = await Clients.findAll({
      where: { CompanyId: id },
      offset: offset || 0,
      limit: 10,
    });
    res.status(200).send({ payload: payload,totalItems:totalItems, message: "success" });
  } catch (e) {
    console.log(e);
    res.status(200).send({message: "error" });
  }
});

routes.post("/api/createClient", async (req, res) => {
  console.log(req.body);
  const { data, id } = req.body;
  try {
    const payload = await Clients.create({
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
    });
    res.status(200).send({ message: "success", payload: payload }); 
  } catch (e) {
    res.status(200).send({message: "error" });
  }
});

routes.post("/api/updateClient", async (req, res) => {
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
    console.log(e);
    res.json({
      status: "error",
      message: "Something Went Wrong Please Try Again",
    });
  }
});

routes.delete("/api/deleteClient", async (req, res) => {
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
