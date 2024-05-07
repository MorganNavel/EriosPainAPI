import { User } from "../../models/UserModel";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../middleware";

export default (app: Express) => {
  app.get("/api/users", authMiddleware, async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const userOutput = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        nom: user.dataValues.nom,
        prenom: user.dataValues.prenom,
        occupation: user.dataValues.occupation,
      };

      return res.status(200).json({ message: "Success", data: userOutput });
    } catch (error) {
      return res.status(500).json({ message: "Fail", error });
    }
  });
};
