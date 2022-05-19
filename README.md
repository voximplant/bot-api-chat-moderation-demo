 ## About the project

This demo shows the functionality of the [Voximplant instant messaging SDK](https://voximplant.com/docs/guides/im), including silent supervision by a bot. 

The demo represents a moderated chat where people cannot use certain words. The bot detects messages containing these words, masks them, and warns the person who used them.

In real life, this principle can be used in advertisement services to restrict the exchange of direct means of contact (e.g., phone numbers) or other sensitive information, and thus prevent fraud and provide users with secure communication. 

The bot does not have to be a dictionary-based one, so NLU engines are welcome.

## How it works

The demo consists of 3 parts: the chat interface of user A, of user B, and the admin dashboard. 

The admin lists the words and phrases that should be masked and has access to the bot log where all activity is stored. 

The bot can operate in 2 modes: **proxy** and **real-time**. 

- In the **proxy mode** (“conversation pairs”), the bot first receives a message, analyzes it, and only then shows it to the second user. Each conversation, in fact, is between the user and the bot (there is no direct message exchange between users A and B), so the bot assists in both pairs. 

- In the **real-time mode** (“single conversation”), the chat is among three users: A, B, and the bot. The bot has the right to read and moderate messages. When someone uses a restricted word, the bot masks it postfactum. 

Find more detailed information on how the backend and frontend demo parts work in the corresponding repo folders.
