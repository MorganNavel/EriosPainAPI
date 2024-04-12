import { Express, Request, Response } from "express";
import { User } from "../../models/UserModel";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { validateRegisterSchema } from "../../middleware";

dotenv.config();

export default (app: Express) => {
    app.post("/api/register", validateRegisterSchema, async (req: Request, res: Response) => {
        const { nom, prenom, username, password, occupation } = req.body;
            
        try {
            // Vérifiez si l'utilisateur existe déjà
            const foundUser = await User.findOne({ where: { username: username} });
            if (foundUser) {
                return res.status(400).json({ message:"Fail", error:"Ce nom d'utilisateur est déjà utilisé." });
            }

            // Générer un sel aléatoire
            const salt = generateSalt();

            // Hacher le mot de passe avec le sel
            const hashedPassword = await hash(password + salt, 10); // 10 est le nombre de tours pour le salage

            // Création d'un nouvel utilisateur dans la base de données
            const newUser = await User.create({ nom, prenom, username, password: hashedPassword, occupation, salt });

            // Génération du JWT
            const accessToken = sign({ userId: newUser.dataValues.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

            // Envoi de la réponse avec le JWT
            res.status(201).json({message:"Sucess", user: {id: newUser.dataValues.id, nom, prenom, username, occupation}, accessToken });
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            res.status(500).json({ message:"Fail" , error:"Erreur lors de l'inscription",erreur:error });
        }
    });
};

// Fonction pour générer un sel aléatoire
function generateSalt(): string {
    const randomBytes = crypto.randomBytes(16);
    return randomBytes.toString('hex');
}
