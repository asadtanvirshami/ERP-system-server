const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;

const {
  Sales,
  Invoices,
  Clients,
} = require("../functions/associations/invoicesAssociations");
const { Company } = require("../functions/associations/companyAssociations");

routes.get("/api/getAllInvoices", async (req, res) => {
  const { id } = req.headers;
  const page = parseInt(req.headers.page) || 0;
  const limit = parseInt(req.headers.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;

  try {
    const totalItems = await Users.count({
      where: { type: "agent", CompanyId: id },
    });
    const agents = await Users.findAll({
      where: { type: "agent", CompanyId: id },
      offset: offset,
      limit: limit,
    });
    res
      .status(200)
      .send({ payload: agents, totalItems: totalItems, message: "success" });
  } catch (e) {
    res.status(500).send({ message: "error" });
  }
});

routes.get("/api/getInvoicebyId", async (req, res) => {
  const { id } = req.headers;

  try {
    const invoice = await Invoices.findOne({
      where: { id: id },
      include: [
        {
          model: Sales,
        },
        {
          model:Company
        },
        {
          model: Clients,
        },
      ],
    });
    res.status(200).send({ payload: invoice, message: "success" });
  } catch (e) {
    res.status(500).send({ message: "error" });
  }
});

routes.post("/api/createInvoice", async (req, res) => {
  console.log(req.body);
  const code = Math.floor(100 + Math.random() * 9000);
  const { data, id } = req.body;
  try {
    const payload = await Invoices.create({
      tax: data.tax,
      due_amount: data.due_amount,
      due_date: data.due_date,
      status: data.status,
      date:data.date,
      time:data.time,
      SaleId: data.state.sale,
      ClientId: data.state.client,
      CompanyId: id,
      code: `#${code}`,
    });
    await Sales.update(
      {
        InvoiceId: payload.id,
        ClientId: data.state.client,
        code: `#${code}`,
      },
      { where: { id: data.state.sale } }
    );
    res.status(200).send({ message: "success", payload: payload });
  } catch (e) {
    res.status(200).send({ message: "error" });
  }
});

module.exports = routes;
