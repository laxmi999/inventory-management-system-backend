import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
// import { SequelizeOptions } from 'sequelize-typescript'; // Optional: if using advanced TypeScript features
import * as dotenv from 'dotenv';
dotenv.config();

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
// tslint:disable-next-line:no-console
// console.log(fileName, dirName);
const basename = path.basename(fileName);
const env = process.env.NODE_ENV || 'development';
const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
};
const db: { [key: string]: any } = {};

let sequelize: Sequelize;
// tslint:disable-next-line:no-console
console.log(config);

sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password as string,
  {
    host: config.host as string,
    dialect: config.dialect as 'postgres',
  }
  // config as SequelizeOptions
);

fs.readdirSync(dirName)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(dirName, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
