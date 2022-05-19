module.exports = {
  apps: [
    {
      name: 'solutions-messaging-bot-dev',
      script: 'yarn',
      args: 'start:dev',
      interpreter: 'none',
    },
    {
      name: 'solutions-messaging-bot',
      script: 'yarn',
      args: 'start',
      interpreter: 'none',
      error_file: './pm2_outputs/prod/err.log',
      out_file: './pm2_outputs/prod/out.log',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
