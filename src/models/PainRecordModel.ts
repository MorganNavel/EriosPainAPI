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
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'painRecord',
    }
    );
    return PainRecord
}
export {PainRecordModel, PainRecord}


