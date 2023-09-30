const routes = require('express').Router();
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const {Sales,Invoices, Users} = require('../functions/associations/salesAssociations');
const Clients = require('../models/Clients');

routes.get("/api/getAllSales", async (req, res) => {
    const { id } = req.headers;
    const page = parseInt(req.headers.page) || 0;
    const limit = parseInt(req.headers.limit) || 5;
    
    const zeroBasedPage = Math.max(0, page - 1);
    const offset = zeroBasedPage * limit;
  
    try {
      const totalItems = await Sales.count({ where: { CompanyId: id } });
      const sales = await Sales.findAll({ 
        where: { CompanyId: id },
        offset: offset,
        limit: limit,
      });
      res.status(200).send({ payload: sales, totalItems:totalItems,  message:'success' });
    } catch (e) {
      res.status(500).send({  message:'error'});
    }
  });

  routes.get("/api/getAllUserSales?", async (req, res) => {
    const { id, userId } = req.headers;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    
    const zeroBasedPage = Math.max(0, page - 1);
    const offset = zeroBasedPage * limit;
  
    try {
      const totalItems = await Sales.count({ where: { CompanyId: id, UserId:userId } });
      const userSales = await Sales.findAll({ 
        where: { CompanyId: id,  UserId:userId },
        offset: offset,
        limit: limit,
      });
      res.status(200).send({ payload: userSales, totalItems:totalItems,  message:'success' });
    } catch (e) {
      res.status(500).send({  message:'error'});
    }
  });

  routes.post("/api/createSale", async (req, res) => {
    console.log(req.body);
    const {
      type,
      description,
      deadline,
      created_date,
      created_time,
      created_month,
      userId,
      source,
      source_link,
      source_username,
      total_amount,
      t_amount_txt,
      companyId,
      status,
      service,
    } = req.body;
    try {
      const payload = await Sales.create({
        source:source,
        source_link:source_link,
        description: description,
        deadline: deadline,
        total_amount:total_amount,
        total_amount_txt:t_amount_txt,
        source_username:source_username,
        status:status,
        created_date:created_date,
        created_month:created_month,
        created_time:created_time,
        service:service,
        UserId: userId,
        CompanyId: companyId,
      });
      // const createInvoice = await Invoices.create({
      //   SaleId: payload.id,
      //   UserId: payload.UserId,
      //   CompanyId: payload.CompanyId,
      //   code:payload.code,
      //   time:payload.created_time,
      //   date:payload.created_date
      // });
      res.status(200).send({
        message: "success",
        payload: payload,
      });
    } catch (e) {
      res.status(304).send({ status: "error", message: "Error Occured" });
      console.log("Error Occured", e);
    }
  });


module.exports = routes;