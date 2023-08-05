const routes = require('express').Router();
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const {Sales,Invoices, Users} = require('../functions/associations/salesAssociations')

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
    const task_code = Math.floor(100 + Math.random() * 9000);
    const {
      type,
      description,
      deadline,
      created_date,
      created_time,
      userId,
      source,
      source_link,
      amount_paid,
      amount_left,
      total_amount,
      t_amount_txt,
      companyId,
    } = req.body;
    try {
      const payload = await Sales.create({
        type: type,
        source:source,
        source_link:source_link,
        description: description,
        deadline: deadline,
        amount_paid:amount_paid,
        amount_left:amount_left,
        total_amount:total_amount,
        total_amount_txt:t_amount_txt,
        created_date: created_date,
        created_time: created_time,
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


module.exports = routes;