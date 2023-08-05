const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const db = require("./models");

const verify = require('./functions/tokenVerification'); //import from functions folder
const authRoute = require('./routes/auth')
const clientRoute = require('./routes/clients')
const companyRoute = require('./routes/company')
const invoicesRoute = require('./routes/invoices')
const optionsRoute = require('./routes/options')
const salesRoute = require('./routes/sales')
const projectRoute = require('./routes/projects')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/tasks')

app.use(morgan('tiny'));

app.use(cors());
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(express.json());
db.sequelize.sync();

app.get("/", (req, res) => { res.json('Welcome to ERP ManagmentX Server') });
app.get("/isLoggedInVerification", verify, (req, res) => { res.json({isLoggedIn:true, name:req.body.name}) });

app.use("/auth", authRoute);
app.use("/client", clientRoute);
app.use("/sales", salesRoute);
app.use("/projects", projectRoute);
app.use("/user", userRoute);
app.use("/tasks", taskRoute);
app.use("/company", companyRoute);
app.use("/invoices", invoicesRoute);
app.use("/options", optionsRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});