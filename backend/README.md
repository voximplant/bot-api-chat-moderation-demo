# Moderated chat implementation. Backend

Demo parts:
- GRPC client is to communicate with the Voximplant server and process received events. In this demo, a bot can log events, send messages to chat rooms, and edit user messages.
- Bot control server. There are no restrictions on technologies/methodologies/frameworks here; you can use REST, SOAP, GraphQl, RPC, etc. This demo uses REST.
- Additional methods are to work with the database, differentiate access rights, etc.

## Demo structure
The project consists of isolated modules, each of them implements certain functionality.

Each module consists of:
- Entry point - `*.module.ts` files - ensuring that the rest parts interact correctly
- Controllers - `*.controller.ts` files - initial processing of the input data; binding to specific HTTP endpoints via `@GET`, `@POST`, etc.
- Services - `*.service.ts` files - implementation of the main application logic
- Entities - `*.entity.ts` files - database descriptions

The main demo part is implemented in `/src/modules/bot`. A server to store user data is implemented in the user module (`/src/modules/user`).

## Demo setup
Before launching the demo:
1. Create a [Voximplant application](https://manage.voximplant.com/applications).
2. Create a bot and chat rooms.
3. Fill the database with the information about users and chat rooms.
4. Configure environment variables.

### 1. Create an application
1. Log in or create a new account in the [Voximplant control panel](https://manage.voximplant.com/).
2. Go to the [Applications](https://manage.voximplant.com/applications) section and create an app.
3. Go to **Users** section of your app and create users.
You can also create apps and users through the [Voximplant Management API](https://voximplant.com/docs/references/httpapi).

### 2. Create a bot and chat rooms
1. A bot is created with a POST HTTP request: `{bot_api_url}/{api_version}/bot/create`, where `bot_api_url` is the url to access the Voximplant API, `api_version` is the API version.
If successful, the response contains at least the following fields:
- **private_key** - the key used to issue a JWT required to work with the bot
- **key_id** - key identification number
- **client_id** - bot identification number needed to add a bot to chat rooms

It is important to store **private_key** and **key_id** in a safe place.

2. Chat rooms are created with a POST HTTP request: `{bot_api_url}/{api_version}/conversation/create`.
As parameters, pass the **client_id** of the participants and the **client_id of the bot created in the previous step.

If you want the bot to moderate messages in a conversation, give it the corresponding rights with a POST request: `{bot_api_url}/{api_version}/conversation/manage_permissions`.

This demo shows two options of how the bot works: 
- Individual room for each participant where the bot moderates and forwards messages to the recipient room.
- Сommon room for several participants where the bot moderates and edits user messages.

### 3. Fill the database
The demo uses the sqlite database. The logic for creating user and chat room records can vary depending on the application you create. It is not part of this demo.

You can use any database utilities or editors. Find the detailed description of the database structure in the `*.entity.ts` files.
Blocklist management and log receiving are implemented using REST requests. You can fill or get the blocklist through the admin panel (see the frontend part).

### 4. Configure environment variables
Environment variables are taken from the `.env` file when startinng the server. Find the detailed description in the `.env.example` file.

## Launch the demo
To launch the demo, you need to:
1. Install dependent modules
2. Run migrations to initialize the database (optional)
3. Start the server

### 1. Install dependent modules
Nodejs version 16+ is recommended.

```bash
yarn install --frozen-lockfile
```

### 2. Run migrations
Run the migrations only once to initialize the database.

```bash
yarn migration:run
```

### 3. Start the server
Start the server in the development mode. It features more detailed logging in stdout and restarting the project when the code is changed:

```bash
yarn start:dev
```

Start the server in the production mode. It is faster but less informative:

```bash
yarn build && start:prod
```
