### ToDo App
#### MERN-Stack FrontEnd+Backend

#### Configuration

Add your own `MONGO DB` from your MongoDB database in `server/.env`.

```javascript
DB_PORT=27017
DB_HOST=localhost
DB_NAME=todo-app
```

Example ```.env.example```

Add your own `SENDGRID_API_KEY` and `EMAIL_FROM` in `server/.env`.
```javascript
SENDGRID_API_KEY=
EMAIL_FROM=
BASE_URL=http://localhost:3000
```

#### Running locally

```javascript
// Install dependencies for server && client 
// in folder server:
npm install && npm run client-install

// Run client & server with concurrently
// in folder server:
npm run dev

// Server runs on http://localhost:8000 and client on http://localhost:3000
```