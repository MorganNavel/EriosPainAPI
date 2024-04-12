
import { Express, Request, Response } from "express";
import { User } from "../../models/UserModel";
import { authMiddleware } from "../../middleware";


export default (app: Express) => {
    app.delete("/api/user/:id", authMiddleware, async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const deleted = await User.destroy({where: {id}});
            
            return res.status(200).json({ message: "Success", deleted });
        } catch (error) {
            return res.status(500).json({ message: "Fail", error });
        }
    });
};