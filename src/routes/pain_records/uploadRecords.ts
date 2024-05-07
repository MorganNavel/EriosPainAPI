import { Express, Request, Response } from "express";
import { PainRecord } from "../../models/PainRecordModel";
import { authMiddleware, validateStreamDateMiddleware } from "../../middleware";
import { Patient } from "../../models/PatientModel";

export default (app: Express) => {
  app.post(
    "/api/patient/:id/streams",
    validateStreamDateMiddleware,
    authMiddleware,
    async (req: Request, res: Response) => {
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
      const id = parseInt(req.params.id);

      const painRecords = records.map((record: any) => ({
        level: record.level,
        evaluation_date: record.evaluation_date,
        patientId: id,
      }));

      try {
        await PainRecord.bulkCreate(painRecords);

        return res.status(200).json({ message: "Success" });
      } catch (error) {
        return res.status(500).json({ message: "Fail", error });
      }
    }
  );
};