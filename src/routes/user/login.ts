import { Express, Request, Response } from "express";
import { User } from "../../models/UserModel";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default (app: Express) => {
    app.post("/api/login", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            // Recherche de l'utilisateur dans la base de données par nom d'utilisateur
            const user = await User.findOne({ where: { username } });

            // Vérification si l'utilisateur existe
            if (!user) {
                return res.status(404).json({ message: "Fail", error: "Utilisateur non trouvé"});
            }

            // Récupération du sel de l'utilisateur depuis la base de données
            const salt = user.dataValues.salt;


            // Vérification du mot de passe en utilisant bcrypt
            const passwordMatch = await compare(password+salt, user.dataValues.password);
            console.log(password,user.dataValues.password)

            if (!passwordMatch) {
                return res.status(401).json({ message:"Fail" , error:"Mot de passe incorrect" });
            }

            // Génération du JWT
            const accessToken = sign({ userId: user.dataValues.id}, process.env.JWT_SECRET!, { expiresIn: "1h" });
            const logged_user = {
                username,
                nom: user.dataValues.nom,
                prenom: user.dataValues.prenom,
                occupation: user.dataValues.occupation
            }

            // Envoi de la réponse avec le JWT
            res.status(200).json({ message: "Success", user:logged_user,  accessToken });
        } catch (error) {
            res.status(500).json({ message: "Fail", error: "Erreur lors de la connexion" });
        }
    });
};
