
import { Express, Request, Response } from "express";
import { PainRecord } from "../../models/PainRecordModel";
import { authMiddleware } from "../../middleware";

export default (app: Express) => {
    app.get("/api/patient/:id/streams", authMiddleware, async (req: Request, res: Response) => {
        const id  = parseInt(req.params.id);
        try {
        const data = (await PainRecord.findAll({where: {patientId: id}})).map((record) => (record.dataValues));
        return res.status(200).json({message:"Success", data})
        } catch(error){
        return res.status(500).json({message:"Fail", error})
        }
    });
}