import { Request, Response, NextFunction } from "express";
import { dateParser } from "./helper";
import jwt from "jsonwebtoken";
import { patientSchema } from "./schemes/patient";
export function validateNaissanceDateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { dateNaissance } = req.body;
    const dateObj = validateDate(dateNaissance)
    if(!dateObj){
      return res.status(400).json({ message: "Le format de la date de naissance doit être (DD/MM/YYYY ou DD-MM-YYYY)" });
    }
    req.body.dateNaissance = dateObj;
    next();
  }

  export function validateStreamDateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { records } = req.body;
    for (const record of records) {
      const dateObj = validateDate(record.evaluation_date)
      if(!dateObj){
        return res.status(400).json({ message: "Le format de la date d'évaluation doit être (DD/MM/YYYY ou DD-MM-YYYY)" });
      }
      record.evaluation_date = dateObj;
    }
    next();
  }
function validateDate(dateString: string) {
    const dateObj = dateParser(dateString);
    if (isNaN(dateObj.getTime())) {
      return 
    }
    return dateObj
  }
  


export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le JWT du header Authorization
  
    if (!token) {
      return res.status(401).json({ message: "Non autorisé. Token manquant." });
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
      //TOKEN DECODED
      req.body.loggedUserEmail = decoded.email;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Non autorisé. Token invalide." });
    }
}

export function patientMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    validateMiddleware(patientSchema)(req, res, next);
  }

function validateMiddleware(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: "Failed", error: error.details[0].message });
      }
      next();
    };
}

