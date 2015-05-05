
# RethinkDB Workshop

Learn the basics of RethinkDB and ReQL(RethinkDB query language) through building a simple chat app.

This repo teaches you the basics of ReQL by having the user write ReQL queries to get this chat app to work.

## Setup

### #1 Install RethinkDB and Node.js

If using *Mac*:

```
brew install rethinkdb
brew install node
```

After install RethinkDB and Node.js, go the root directory of the repo and install all dependencies.

```
npm install
```

### #2 Creating database tables, and indexes

Go to the data explorer (`http://localhost:8080/#dataexplorer`) and run the following commands. 

*This step is optional, since the node app wil create these automatically*

Create the database:

```
r.dbCreate(`rethinkdb_workshop`);
```
Create the `messages` table:
```
r.db(`rethinkdb_workshop`).tableCreate(`messages`);
```
Create the `users` table with `email` as the primary key:
````
r.db(`rethinkdb_workshop`).tableCreate(`users`, { primaryKey: email });
```
Create a `created` secondary index on the `messages` table:
```
r.db(`rethinkdb_workshop`).table(`messages`).indexCreate(`created`);
```
## Instructions

**To get started, take a look at the instructions in the server/index.js file**

After starting node and creating the necessary tables, you can now start writing ReQL queries to complete the excercise.

Complete all 5 steps to get the chat app working. Each step will involve writing a ReQL query to get a part of the app working.

1. Sign up: /server/auth/authcontroller.js:L18
2. Login (2.1 and 2.2): /server/auth/index.js:L28 and L29
3. Inserting messages: /server/index.js:116
4. Getting messages: /server/index.js:L55
5. Listening for messages: /server/index.js:L90

After completing these 5 steps, your chat app will run correctly.

**If you get stuck**:

Don't spend more than 10 minutes on any step. If you get stuck, there
are branches with the solutions for each step. Consult these branches
and move on to the next one.

**Extra credit:**

If you finish with all steps, consider implementing some of the
following features:

1. Adding rooms to chat app
2. Displaying users in room/chat
3. Add multiple nodes to the RethinkDB cluter
4. Add message search
5. Add message liking
6. Add the ability to delete messages

### Step 1 : Creating user

**Query instructions:**

Write a query that checks if a user exists in the database and inserts a document with `email` and `password` if it doesn't and returns false if the use already exists

HINT: Don't use the `filter` method
ADVANCED: Try using the `branch` method

**Result:**

Once you have completed this query correctly, you'll be able to sign up in the front-end and see the registered user in the database. You won't be able to sign in.

### Step 2.1 : Login

**Query instructions:**

Write a query that gets a user through by his email the `email` field is the table's primary key. The result should be an object with the user email and password hash

HINT: Don't use the filter method.

**Callback instructions:**

Once the user has been returned, pass it to the `done` function as the second argument:
```
  done(null, user);
```
**Result:**

Once you complete the 2 queries in this file, you'll be able to log in to the site.

### Step 2.2 : User login

**Query instructions:**

Write a query to get a user by their email

**Callback instructions:**

Check to see if the user exists (is not `null`) and if the password submitted by the user matches the password in the database.

If the user is null, call `done` with `null` and `false`
```
  done(null, false);
```
If the passwords dont match, call `done` with `null` and `false`
```
  done(null, false);
```
If the user is found, call `done` with `null`, and the user object
```
  done(null, user);
```
**Result:**

After completing step 2.1 and this step, you'll be able to login with the created account.

### Step 3 : Inserting messages

**Query instructions:**

Insert a document into the `messages` table with the following attributes: `text`, `email`, `created`

**Fields:**

`text`: A string with the message text from the user
`email`: An email address that exists in the `users` table
`created`: A Unix Timestamp `(new Date()).getTime()`

**Callback instructions:**

There is no need for a callback.

**Result:**

Once you write this query, you'll be able to insert new messages in the front-end and see them in the database

### Step 4: Getting messages

**Query instructions:**

Write a query that gets all messages, ordered by `created` (a secondary index)

**Callback instructions:**

Return the messages array as a JSON document through `res`:
```
  res.json(messages);
```
**Result:**

Once you have written this query, you'll be able to see all previously inserted messages when loading the page

### Step 5 : listening for messages

**Query instructions:**

Write a query that listens to changes in the `messages` table.

HINT: the query will return a cursor, not an array
HINT: the objects return by the cursor have a `new_val` and an `old_val` property

**Callback instructions:**

Every time a change is pushed by the database, push that change to the client by emitting a socket event:
```
  socket.emit('message', row.new_val);
```

**Result:**

Once you write this query, you'll be able to see new messages be displayed as they are being added

### Running Node

Run the node server using the following command:

```
# Mac and Linux
npm run dev
# Windows
node server
```

