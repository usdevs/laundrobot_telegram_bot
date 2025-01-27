# Laundrobot
TODO: Add project description here

### Local Development
1. Prerequisites
- `docker` - we use this to run a local instance of MongoDB
  - Verify that you have docker installed by running `docker -v`. You should see the version of docker that you have installed on your machine.
  - Else, download docker [here](https://docs.docker.com/get-started/get-docker/).
- `npm` - node package manager
  - Verify you have npm installed by running `npm -v`
  - npm comes together with node. If you don't have either one, you need to install node from [here](https://nodejs.org/en/download/)
- `pipenv` - python virtual environment manager + package manager, for the python telegram bot
  - Verify you have pipenv installed by running `pipenv --version`
  - Make sure you have python installed on your machine first. If not, download Python3 [here](https://www.python.org/downloads/)
  - Then, run `pip install pipenv`

2. First, run
```
npm run setup:all
```
This will start up the local MongoDB container, and install the dependencies for the telegram bot and express API server.

3. Then, start your local express API server
```
npm run dev:api
```

4. In a separate terminal, start you local telegram bot server
```
npm run dev:bot
```

#### Notes
`.env.bak` in `/laundrobot-telegram-main` stores the token for our test telegram bot. The token is shared across all developers, please do replace it with your own token if needed. You can get one from @botfather on telegram

### Local Development (Manual Setup)
If the above doesn't work, or you prefer to set up everything manually, you can follow the steps below.

1. Spin up a local MongoDB container
```
npm run dock:mongo:up
```

2. Next, setup your local API server. The following commands will be run in the `/laundrobotAPI-main` directory
```
cd laundrobotAPI-main
```

3. Create the .env file
```
cp .env.bak .env
```

4. Install project dependencies
```
npm install
```

5. Start the API server (with hot-reload)
```
npm run dev
```
If you want to start the local server without hot-reloading, use `npm run serve`.

6. Now, let's set up the telegram bot. The subsequent commands will be run in the `/laundrobot-telegram-main` directory.
```
cd laundrobot-telegram-main
```

7. Create the .env file
```
cp .env.bak .env
```

8. Install project dependencies
```
pipenv install
```

9. Enter into the virtual environment
```
pipenv shell
```

10. Start the telegram bot server
```
python bot.py
```

### Running with Docker Compose
First, make sure you have a `.env` file in the root directory.
```
cp .env.bak .env
```

The `.env` file should contain the following variables:
- `TELEGRAM_BOT_TOKEN` - the token for your telegram bot
- `ENVIRONMENT` - either `dev` or `prod`

Build and run the containers for MongoDB, API server, and telegram bot using docker compose
```
npm run dock:up
```

To stop the containers, run
```
npm run dock:down
```