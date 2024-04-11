import { Express, Request, Response } from "express";
import { Patient } from "../../models/PatientModel";
import { authMiddleware } from "../../middleware";



export default (app: Express) => {
    app.delete("/api/patient/:id", authMiddleware ,async (req: Request, res: Response) => {
        const id  = parseInt(req.params.id);
        try {
        const deleted = await Patient.destroy({where: {id}});
        return res.status(200).json({message:"Success", deleted})
        } catch(error){
        return res.status(500).json({message:"Fail", error})
        }
    });
}