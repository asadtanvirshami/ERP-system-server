const Sequelize = require('sequelize');

const routes = require("express").Router();
const {Options, Company} = require("../functions/associations/optionsAssociations")

// routes.post("/api/createOptions", async (req, res) => {
//     console.log(req.body)
//     try {
//     await Options.create({
//     services:req.body
//     })
//       res.status.send(200)
//     } catch (error) {
//       console.log(); 
//       res.send(error);
//     }
//   });

routes.post("/api/updateOptions", async (req, res) => {
    const {data,id,name} = req.body
  console.log(data)
    try {   
        const newd = await Options.update(
          {
            sources:data[0],
            status:data[1],
            inv_status:data[2],
            designation:data[3],
            countries:data[4],
            services:data[5],
          },
          { where: { CompanyId: id } }
        );
      res.status(200).send({newd})

    } catch (error) {
      res.send(error);
    }
  });
  
routes.get("/api/getOptions", async (req, res) => {
  const {id} = req.headers
  console.log(id)
    try {
     const foundedOptions = await Options.findOne({where:{CompanyId:id}})
     res.status(200).send({ payload: [foundedOptions], message: 'success' });
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });


module.exports = routes;