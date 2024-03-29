import { DataTypes, Sequelize } from 'sequelize';
import { PatientModel } from './models/PatientModel';
import { PainRecordModel } from './models/PainRecordModel';
import { seedPatients } from './helper'
export function initDb(){
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
    });
    
    const Patient = PatientModel(sequelize, DataTypes);
    const PainRecord = PainRecordModel(sequelize, DataTypes);
    Patient.hasMany(PainRecord);
    PainRecord.belongsTo(Patient);
    (async () => {
        try {
            await sequelize.sync({ force: true });
            // await seedPatients(); // Appel de la fonction pour ajouter les patients par défaut
        } catch (error) {
            console.error('Unable to sync database:', error);
        }
    })();
}

