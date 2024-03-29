import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { initDb } from "./sequelize";
import { Patient } from "./models/PatientModel";
import { PainRecord } from "./models/PainRecordModel";
import { validateDateMiddleware, patientMiddleware } from "./middleware";
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
app.post("/api/patient",patientMiddleware,validateDateMiddleware, async (req: Request, res: Response) => {
  const { nom, dateNaissance, genre } = req.body;
  
  try {
    const patient = await Patient.create({nom, dateNaissance, genre});
    return res.status(200).json({message:"Success", data: {patient}})
  } catch(error){
    return res.status(500).json({message:"Fail", error})
  }
});

app.post("/api/patient/:id/streams", async (req: Request, res: Response) => {
  /*
  Example of request body
  {
    "records":[1,2,3,5,4,9,7,5,2,5]
  }
  */
  const { records } = req.body;
  const id  = parseInt(req.params.id);

  const painRecords = records.map((record: number) => ({
    level: record,
    patientId: id,
    
  }));
  try {
    const data = (await PainRecord.bulkCreate(painRecords)).map((record) => (record.dataValues));
    return res.status(200).json({message:"Success",data})
  } catch(error){
    return res.status(500).json({message:"Fail", error:"Patient not found"})
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
