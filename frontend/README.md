# Moderated chat implementation. Frontend

The moderated chat frontend is not very different from a usual chat's. The logic of the interaction with the Voximplant API does not change. However, the UUIDs must be obtained from the bot backend, not from Voximplant, because the UUIDs must be prepared in advance (see the backend description).

## Demo structure
Frontend represents a single-page application; see page templates in `src/views/*`.

Main templates:
- `/chat/:chatUuid` - chat room; links to the chat rooms are in the admin panel
- `/admin` - admin panel

When visiting the page for the first time, you can be redirected to the authentication form. Login and password of the chat participant are set when creating a Voximplant user, login and password of the administrator - when setting up the backend.

Methods for interacting with the backend and WebSDK are described in `/src/sevices`:
- `bot.service.ts` - interaction with the bot
- `vox.service.ts` and `messenger.service.ts` - interaction with WebSDK
- `storage.service.ts` - interaction with localstorage

## Demo setup
Before launching the demo:
1. Set up and run the backend.
2. Configure environment variables.

### 1. Set up and run the backend
Find the detailed description in the backend README.md file.

### 2. Configure environment variables
Environment variables are taken from the `.env` file when startinng the server. Find the detailed description in the `.env.example` file.

## Launch the demo
Install dependencies:

```bash
yarn install --frozen-lockfile
```

Start the project in the development mode:

```bash
yarn serve
```

Compile the project:

```bash
yarn build
```