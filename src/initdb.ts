import { Sequelize } from 'sequelize';
import * as config from './config';
import { User } from './models/user';

let sequelize: Sequelize;

/**
 * Initialize the database, getting a connection
 */

export async function initDb () {
  sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
    },
  );

  await sequelize.authenticate();

  const models = [
    User,
  ];
  models.forEach((model) => {
    if (model.initialize) {
      model.initialize(sequelize);
    }
  });
}
