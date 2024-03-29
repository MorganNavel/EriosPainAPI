import { DataTypes, Sequelize } from 'sequelize';
import { PatientModel } from './models/PatientModel';
import { PainRecordModel } from './models/PainRecordModel';
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
            await sequelize.sync({ force: false });
        } catch (error) {
            console.error('Unable to sync database:', error);
        }
    })();
}

