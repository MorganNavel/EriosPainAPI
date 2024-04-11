import { Model, Sequelize } from 'sequelize';
import { Patient } from './PatientModel';
class PainRecord extends Model {}

function PainRecordModel(sequelize: Sequelize, DataTypes: any){

    PainRecord.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        evaluation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id'
            },
        }
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'painRecord',
        indexes: [
            {
              unique: true,
              fields: ['evaluation_date', 'patientId'],
              name: 'unique_evaluation_date_patientId'
            }
          ]
        }
    );
    
    return PainRecord
}
export {PainRecordModel, PainRecord}


