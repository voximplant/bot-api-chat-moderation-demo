import { createConnection } from 'typeorm';
import connectionOptions from './connection-options';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => await createConnection(connectionOptions),
};
