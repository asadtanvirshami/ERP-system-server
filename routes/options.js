const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const routes = require("express").Router();
const { Options } = require("../models");

routes.post("/setoptions", async (req, res) => {
    console.log(req.body)
    try {
    await Types.create({
    cities:`${[req.body.name]}`
    },{where:{ id: `${id}` }})
      res.status.send(200)
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });

routes.post("/updateoptions", async (req, res) => {
    const type = req.body.type
    try {   
      if(type=='sources'){
         await routes.update({sources:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='resources'){
     await routes.update({resources:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='countries'){
     await routes.update({countries:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='job_status'){
     await routes.update({job_status:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });
  
routes.get("/getoptions", async (req, res) => {
    try {
     const Res = await Types.findAll()
      res.send(Res).status(200)
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });


module.exports = routes;

module.exports = routes;