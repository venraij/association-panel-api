import { sequelizeOptions } from './sequelize';
import { start } from './server';
import 'ts-node/register';

start(sequelizeOptions);
