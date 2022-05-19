import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: `${__dirname}../../../../.db/db.sqlite`,
  entities: [`${__dirname}../../**/*.entity{.ts,.js}`],
  synchronize: true,
};

export default connectionOptions;
