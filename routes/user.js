const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require('../models');

routes.get("/getAllAgents", async (req, res) => {
    const {id}= req.headers
    const payload = await Users.findAll({where:{type:'agent',id:id}})
    res.status(200).send({payload:payload})
})
module.exports = routes;