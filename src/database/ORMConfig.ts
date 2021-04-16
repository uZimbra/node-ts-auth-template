import path from 'path';
import { ConnectionOptions } from 'typeorm';
import database from '../config/database';

const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.database,

  entities: [path.join(__dirname, '../models/*{.ts,.js}')],

  migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],

  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = ORMConfig;
