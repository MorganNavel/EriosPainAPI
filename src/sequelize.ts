import { DataTypes, Sequelize } from 'sequelize';
import { PatientModel } from './models/PatientModel';
import { PainRecordModel } from './models/PainRecordModel';
import { UserModel } from './models/UserModel';
import dotenv from 'dotenv';
dotenv.config();

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: process.env.DB_HOST as string,
//   port: parseInt(process.env.DB_PORT as string),
//   database: process.env.DB_NAME as string,
//   username: process.env.DB_USERNAME as string,
//   password: process.env.DB_PASSWORD as string,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../database.sqlite", // Chemin vers votre base de données SQLite
  logging: true, // Désactive les logs SQL, vous pouvez les activer pour le débogage
});
export function initDb() {
  const Patient = PatientModel(sequelize, DataTypes);
  const PainRecord = PainRecordModel(sequelize, DataTypes);
  const User = UserModel(sequelize, DataTypes);
  Patient.hasMany(PainRecord);
  PainRecord.belongsTo(Patient);

  (async () => {
    try {
      await sequelize.sync({ force: false });
      return sequelize;
    } catch (error) {
      console.error("Unable to sync database:", error);
    }
  })();
}
export {sequelize}

