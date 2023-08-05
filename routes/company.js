const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Company } = require("../models");
const {
  Sales,
  Invoices,
  Users,
  Clients,
} = require("../functions/associations/companyAssociations");

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

routes.get("/api/company_data", async (req, res) => {
  const { id, offset = 0 } = req.headers;

  try {
    const usersPromise = Users.findAll({
      where: { CompanyId: id, type: 'agent' },
      offset: offset,
      limit: 10
    });

    const salesPromise = Sales.findAll({
      where: { CompanyId: id },
      offset: offset,
      limit: 10
    });

    const clientsPromise = Clients.findAll({
      where: { CompanyId: id },
      offset: offset,
      limit: 10
    });

    const promise = await Promise.all([
      usersPromise,
      salesPromise,
      clientsPromise
    ]);

    res.status(200).send({ payload: promise, message: 'success' });
  } catch (error) {
    res.status(500).send({ message: 'error', error });
  }
});


//SignUP API
routes.post("/api/companyReg", async (req, res) => {
  const { id, data } = req.body;
  console.log(data, id);
  try {
    const companyVerification = await Company.findOne({
      where: { UserId: id },
    });
    console.log(companyVerification);
    if (companyVerification) {
      res.json({ status: "error", message: "exists" });
    } else {
      try {
        const payload = await Company.create({
          name: data.cname,
          location: data.location,
          address: data.address,
          password: data.password,
          phone: data.businessno,
          type: data.type,
          UserId: id,
          no_of_employees: 0,
          no_of_partners: 0,
          legal_doc: "none",
        });
         await Users.update({CompanyId:payload.id},{where:{id:id}})
        res.status(200).json({ status: "success", payload });
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "1Something Went Wrong Please Try Again",
    });
  }
});

module.exports = routes;
