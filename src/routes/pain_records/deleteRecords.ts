import { Express, Request, Response } from 'express';
import { PainRecord } from '../../models/PainRecordModel';
import { Op } from 'sequelize';
import { authMiddleware, validateStreamDatesMiddleware } from '../../middleware';

export default (app: Express) => {
    app.delete('/api/patient/:patientId/streams', authMiddleware, validateStreamDatesMiddleware ,async (req: Request, res: Response) => {
        const { startDate, endDate } = req.body; // Supposons que les dates de début et de fin sont envoyées dans le corps de la requête
        const patientId = req.params.patientId;
    
        try {
            // Supprimez les streams pour le patient spécifié entre les dates de début et de fin
            const deleted = await PainRecord.destroy({
                where: {
                    patientId: patientId,
                    evaluation_date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            res.status(200).json({ message: 'Success', deleted });
        } catch (error) {
            res.status(500).json({ message: 'Fail', error });
        }
    });
}