# rebelbot
Discord bot developed for TWA players.


# Dependencies

## Production
The following must be installed in order to run rebelbot:

 * Node
 * npm

## Development
The following development dependencies exist for rebelbot:

 * nodemon
   * install with npm using: `npm install -g nodemon`


# auth.json
Add an auth.json file; it should contain authentication token for the bot.  See sample below:

```
{
   "token": "mytokenvalue"
}
```

# Build
To build enter the following at root directory:

```
npm run build
```

# Start
To launch the bot in development, enter the following at root directory:

```
npm start
```

# Production
To launch the bot in production environment, enter the following at root directory:

```
node dist/index.js
```
