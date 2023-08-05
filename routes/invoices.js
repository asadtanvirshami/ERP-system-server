const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const {Sales,Invoices, Clients} = require('../functions/associations/invoicesAssociations')

routes.get("/api/getAllInvoices", async (req, res) => {
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
  
  routes.post("/api/createInvoice", async (req, res) => {
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

module.exports = routes;