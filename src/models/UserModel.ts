import { Model, Sequelize } from 'sequelize';
class User extends Model {
}
function UserModel(sequelize: Sequelize, DataTypes: any) {
    User.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nom: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          prenom: {
            type: DataTypes.STRING, // Pour stocker uniquement la date de naissance sans l'heure
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          occupation: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          salt :{
            type: DataTypes.STRING,
            allowNull: false,
          },          
        },
        {
          timestamps: false,
          sequelize,
          }
      );
      
    return User
}
export { UserModel, User }




