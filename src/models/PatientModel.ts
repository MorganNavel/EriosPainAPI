import { Model, BelongsToGetAssociationMixin, Sequelize } from 'sequelize';
import { PainRecord } from './PainRecordModel';
class Patient extends Model {
    public getRecords!: BelongsToGetAssociationMixin<PainRecord>;
}
function PatientModel(sequelize: Sequelize, DataTypes: any) {
    Patient.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          IPP:{
            type: DataTypes.INTEGER
          },
          nom: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          prenom: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dateNaissance: {
            type: DataTypes.DATEONLY, // Pour stocker uniquement la date de naissance sans l'heure
            allowNull: false,
          },
          genre: {
            type: DataTypes.ENUM('F', 'O', 'H'), // Définition de l'énumération avec les valeurs autorisées
            allowNull: false
          },
          
        },
        
        {
          timestamps: false,
          sequelize,
          modelName: 'patient',
        }
      );
      
    return Patient
}
export { PatientModel, Patient }




