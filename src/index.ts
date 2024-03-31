import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { initDb } from "./sequelize";
import { Patient } from "./models/PatientModel";
import { PainRecord } from "./models/PainRecordModel";
import { validateNaissanceDateMiddleware, patientMiddleware, validateStreamDateMiddleware } from "./middleware";
dotenv.config();

const port = process.env.API_PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initDb();


app.get("/api/patients", async (req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll();
    return res.status(200).json({message:"Success", data: {patients}})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
})
app.post("/api/patient", validateNaissanceDateMiddleware, patientMiddleware, async (req: Request, res: Response) => {
  const { nom, dateNaissance, genre } = req.body;
  
  try {
    const patient = await Patient.create({nom, dateNaissance, genre});
    return res.status(200).json({message:"Success", data: {patient}})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
});
app.delete("/api/patient/:id", async (req: Request, res: Response) => {
  const id  = parseInt(req.params.id);
  try {
    const deleted = await Patient.destroy({where: {id}});
    return res.status(200).json({message:"Success", deleted})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
});

app.post("/api/patient/:id/streams" , validateStreamDateMiddleware, async (req: Request, res: Response) => {
  /*
  Example of request body
  {
    "records":[
                {
                  "level": 5,
                  "evaluation_date": "01-09-2021 00:00:00"
                },
                {
                  "level": 6,
                  "evaluation_date": "01-09-2021 06:00:00"
                }
                ...
              ]
  */
  const { records } = req.body;
  const id  = parseInt(req.params.id);

  const painRecords = records.map((record: any) => (
    {
      level: record.level,
      evaluation_date: record.evaluation_date,
      patientId: id,
  }
  ));
  try {
    const data = (await PainRecord.bulkCreate(painRecords)).map((record) => (record.dataValues));
    return res.status(200).json({message:"Success",painRecords})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
});
app.get("/api/patient/:id/streams", async (req: Request, res: Response) => {
  const id  = parseInt(req.params.id);
  try {
    const data = (await PainRecord.findAll({where: {patientId: id}})).map((record) => (record.dataValues));
    return res.status(200).json({message:"Success",data})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
});


app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});

export default app;
