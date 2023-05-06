const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require('../models');

routes.get("/getAllAgents", async (req, res) => {
    const {id, offset}= req.headers
    
    const payload = await Users.findAll({where:{type:'agent',CompanyId:id},offset: offset||0, limit: 2})
    res.status(200).send({payload:payload})
})
module.exports = routes;