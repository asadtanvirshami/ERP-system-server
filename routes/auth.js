const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const { Users } = require("../models");
const { Company } = require("../functions/associations/companyAssociations");

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

routes.post("/api/Login", async (req, res) => {
  const { email, password } = req.body.data;
  console.log(email,password)
  try {
    const user = await Users.findOne({
      where: { email, password } // this should be hashed in a real-world scenario
    });

    if (!user) return res.send({ message: "invalid" });

    const company = await Company.findOne({
      where: { id: user.CompanyId },
    });

    const payload = {
      type: user.type,
      email: user.email,
      name: user.name,
      loginId: user.id,
      designation: user.designation,
      profile:user.profile_pic,
      companyId: user.CompanyId,
      logo:company.logo ,
      companyName: company.name,
    };

    jwt.sign(payload,  "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm", { expiresIn: "8760h" }, (err, token) => {
      if (err) return res.status(500).json({ message: 'Error signing token' });

      res.status(200).send({
        message: "success",
        token: "BearerSplit" + token,
        payload
      });
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error occurred" });
  }
});


routes.post("/api/signUp", async (req, res) => {
  if (!req.body || !req.body.data) {
    console.log(req.body)
    return res.status(400).json({ message: "Request body or data is missing" });
  }
  const { type, designation, data, id } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email: data.email } });
    if (existingUser) return res.json({ status: "error", message: "exists" });

    let name = data.name;
    if (type === "admin") name = `${data.fname} ${data.lname}`;

    const user = await Users.create({
      name,
      email: data.email,
      phone: data.phone,
      password: data.password, // this should be hashed
      type,
      designation: type === "agent" ? data.designation : designation,
      signature: "pending",
      CompanyId: id || null,
      profile_pic: data.image
    });

    res.status(200).send({ message: "success", payload: user });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error occurred", error });
  }
});
module.exports = routes;
