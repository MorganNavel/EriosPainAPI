import { User } from "../../models/UserModel";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../middleware";


export default (app: Express) => {
    app.get("/api/users", authMiddleware, async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const users = await User.findAll();
            if (!users) {
                return res.status(404).json({ message: "User not found" });
            }
            let data : Array<Object> = []
            users.forEach(user => {
                data.push({
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    nom: user.dataValues.nom,
                    prenom: user.dataValues.prenom,
                    occupation: user.dataValues.occupation,
                    
                })
            });
            
            return res.status(200).json({ message: "Success",data });
        } catch (error) {
            return res.status(500).json({ message: "Fail", error });
        }
    });
}