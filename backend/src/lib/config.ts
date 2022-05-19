import 'dotenv/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import { protobufPackage as botPackageName } from '../types/api-grpc/src/main/proto/api';

export const httpPort = process.env.HTTP_PORT ?? '3123';
export const botServiceGrpcUrl = process.env.BOT_SERVICE_GRPC_URL ?? 'imapi.voximplant.com:3000';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: botServiceGrpcUrl,
    package: botPackageName,
    protoPath: join(__dirname, '../../src/proto/api-grpc/src/main/proto/api.proto'),
    credentials: credentials.createSsl(),
    loader: {
      longs: String,
      keepCase: true,
      includeDirs: [
        join(__dirname, '../../src/proto/api-grpc/src/main/proto'),
        join(__dirname, '../../src/proto/google/api'),
        join(__dirname, '../../src/proto'),
      ],
    },
  },
};

export const botKeyId = process.env.BOT_KEY_ID;
export const botPrivateKey = process.env.BOT_PRIVATE_KEY;

export const botClientId = process.env.BOT_CLIENT_ID;

export const replacePattern = process.env.REPLACE_PATTERN ?? '***';

export const censoredNotificationMessage =
  process.env.CENSORED_NOTIFICATION_MESSAGE ?? 'Your original message was modified. Please, be polite.';

export const adminUserName = process.env.ADMIN_USER_NAME ?? 'admin';
export const adminUserPass = process.env.ADMIN_USER_PASS ?? 'password123';
