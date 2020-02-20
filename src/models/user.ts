import { DataTypes, Model } from 'sequelize';

export class User extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    User.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      familyName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      givenName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'users',
      sequelize,
    });
  }

}
