const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require("../models");
const { Company } = require("../functions/associations/companyAssociations");

//Mail Function
async function mailFunc(x, otp) {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "asadworkemail@gmail.com",
      pass: "xsmtpsib-009a6fa866b33ba10e58c8fd1a844d514a89d87ce33172bd4d538d7d92cd6ba3-gwHJXZSsp3I2PFnm",
    },
  });

  let info = await transporter.sendMail({
    from: `"Wengty Team" <wengty@gmail.com>`,
    to: `${x}`,
    subject: "Welcome To MavDocs",
    html: `<p>Your Account has been successfully setup</p>
        <p>Enter the following code in the login screen</p>
        <h1>${otp}</h1>
        <br/>
        <p>Do not share this code with anyone else.</p>
        <br/>
        <p>Regards</p>
       <p>Support Team</p>`,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
//Login API
routes.post("/Login", async (req, res) => {
  const { data } = req.body;

  if (data.email && data.password) {
    const userVerification = await Users.findOne({
      where: { email: data.email, password: data.password },
    });
    if (userVerification) {
      const userCompany = await Company.findOne({
        where: { id: userVerification.CompanyId},
      });
      if (
        userVerification.email == data.email &&
        userVerification.password == data.password
      ) {
        const payload = {
          type: userVerification.type,
          email: userVerification.email,
          name: `${userVerification.name}`,
          loginId: `${userVerification.id}`,
          designation: `${userVerification.designation}`,
          companyId: `${userVerification.CompanyId}`,
          companyName: `${userCompany.name}`,
        };
        jwt.sign(
          payload,
          "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm",
          { expiresIn: "8760h" },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.status(200).json({
              message: "success",
              token: "BearerSplit" + token,
              payload:payload
            });
          }
        );
      } else {
        return res.json({ message: "invalid" });
      }
    } else {
      return res.json({ message: "invalid" });
    }
  } else {
    return res.json({ message: "Invalid" });
  }
});

//SignUP API
routes.post("/signUp", async (req, res) => {
  // const otp = Math.floor(1000 + Math.random() * 9000);
  const { type, designation, data, id } = req.body;
  try {
    if (type == "agent") {
      const agentVerification = await Users.findOne({
        where: { email: data.email },
      });
      if (agentVerification) {
        res.json({ status: "error", message: "exists" });
      } else {
        try {
          const payload = await Users.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            type: type,
            designation: data.designation,
            signature: "pending",
            CompanyId: id,
          });
          // mailFunc(customer.phone, otp);
          res.status(200).send({ message: "success", payload:payload });
        } catch (e) {
          res.json({
            message: "error",
           error:e
          });
        }
      }
    } else if (type == "admin") {
      const adminVerification = await Users.findOne({
        where: { email: data.email },
      });
      if (adminVerification) {
        res.json({ status: "error", message: "exists" });
      } else {
        try {
          const payload = await Users.create({
            name: data.fname + " " + data.lname,
            email: data.email,
            phone: data.phone,
            password: data.password,
            designation: "pending",
            type: type,
            designation: designation,
            signature: "pending",
          });
          res.status(200).send({ status: "success", payload });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      res.json({
        message: "error",
        error: e,
      });
    }
  } catch (error) {
    res.json({
      message: "error",
      error: e,
    });
  }
});

module.exports = routes;
