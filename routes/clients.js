const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require('../models');
const {Sales,Clients} = require('../functions/associations/clientAssociations')


module.exports = routes;