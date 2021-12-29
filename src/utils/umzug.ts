import { Umzug, SequelizeStorage } from 'umzug';
import { sequelizeOptions } from '../sequelize';

export const migrator = new Umzug({
  migrations: {
    glob: __dirname + '/../../dist/db/migrations/*.js',
  },
  context: sequelizeOptions.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: sequelizeOptions,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
