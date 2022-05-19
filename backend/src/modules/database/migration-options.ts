import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import connectionOptions from './connection-options';

const migrationConnectionOptions: ConnectionOptions = {
  ...connectionOptions,
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default migrationConnectionOptions;
