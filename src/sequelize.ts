import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

export const sequelizeOptions = new Sequelize({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_NAME || 'VOTING_DB',
  dialect: (process.env.DATABASE_DIALECT as Dialect) || 'postgres',
  username: process.env.DATABASE_USER || 'Voting',
  password: process.env.DATABASE_PASSWORD || 'test1234',
  logging: (/true/i).test(process.env.DATABASE_LOGGING) || false,
});
