
import { Express, Request, Response } from "express";
import { Patient } from "../../models/PatientModel";
import { validateNaissanceDateMiddleware, patientMiddleware, authMiddleware } from "../../middleware";
import { parse } from "path";

export default (app: Express) => {
    app.post("/api/patient",validateNaissanceDateMiddleware, patientMiddleware, authMiddleware , async (req: Request, res: Response) => {
        const { nom, dateNaissance, genre, prenom, IPP } = req.body;
        
        try {
        const patient = await Patient.create({nom, dateNaissance, genre, prenom, IPP:parseInt(IPP)});
        return res.status(200).json({message:"Success", data: {patient}})
        } catch(error){
        return res.status(500).json({message:"Fail", error})
        }
    });
}