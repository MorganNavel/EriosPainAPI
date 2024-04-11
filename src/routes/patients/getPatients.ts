
import { Express, Request, Response } from "express";
import { Patient } from "../../models/PatientModel";

export default (app: Express) => {
    app.get("/api/patients", async (req: Request, res: Response) => {
    try {
      const patients = await Patient.findAll();
      return res.status(200).json({message:"Success", data: {patients}})
    } catch(error){
      return res.status(500).json({message:"Fail", error})
    }
  })
}
