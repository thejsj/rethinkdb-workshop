# RethinkDB Workshop

Learn the basics of RethinkDB and ReQL(RethinkDB query language) through building a simple chat app.

This repo teaches you the basics of ReQL by having the user write ReQL queries to get this chat app to work.

## Setup: Install RethinkDB and Node.js

If using *Mac*:

```
brew install rethinkdb
brew install node
```

After installing RethinkDB and Node.js, go the root directory of the repo and install all dependencies.

```
npm install
```

You can now run the node server using the following command:

```
# Mac and Linux
npm run dev
# Windows
node server
```

After starting your server, go to [http://localhost:8000](http://localhost:8000) on your browser.

# Instructions

**To get started, take a look at the instructions in the server/index.js file**

After starting node and creating the necessary tables, you can now start writing ReQL queries to complete the excercise.

Complete all 3 steps to get the chat app working. Each step will involve writing a ReQL query to get a part of the app working.

1. Inserting messages: [/server/index.js:122](https://github.com/thejsj/rethinkdb-workshop/blob/master/server/index.js#L122)
2. Getting messages: [/server/index.js:L74](https://github.com/thejsj/rethinkdb-workshop/blob/master/server/index.js#L74)
3. Listening for messages: [/server/index.js:L101](https://github.com/thejsj/rethinkdb-workshop/blob/master/server/index.js#L101)

After completing these 3 steps, your chat app will run correctly.

**If you get stuck**:

Don't spend more than **10 minutes** on any single step. If you get stuck, there are branches with the solutions for each step. Consult these branches and move on to the next one.

**Extra credit:**

If you finish with all steps, consider implementing some of the following features:

1. Adding rooms to chat app
2. Displaying users in room/chat
3. Add multiple nodes to the RethinkDB cluter
4. Add message search
5. Add message liking
6. Add the ability to delete messages

### Step 1 : Inserting messages

**Query instructions:**

Insert a document into the `messages` table with the following attributes: `text`, `email`, `created`

**Fields:**
```
`text`: A string with the message text from the user
`email`: An email address that exists in the `users` table
`created`: A Unix Timestamp `(new Date()).getTime()`
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime

**Callback instructions:**

There is no need for a callback.

**Result:**

Once you write this query, you'll be able to insert new messages in the front-end and see them in the database

### Step 2: Getting messages

**Query instructions:**

Write a query that gets all messages, ordered by `created` (a secondary index)

**Callback instructions:**

Return the messages array as a JSON document through `res`:
```
  res.json(messages);
```
**Result:**

Once you have written this query, you'll be able to see all previously inserted messages when loading the page

### Step 3 : listening for messages

**Query instructions:**

Write a query that listens to changes in the `messages` table.

HINT: the query will return a cursor, not an array

HINT: the objects return by the cursor have a `new_val` and an `old_val` property

[http://rethinkdb.com/docs/changefeeds/javascript/](http://rethinkdb.com/docs/changefeeds/javascript/)

**Callback instructions:**

Every time a change is pushed by the database, push that change to the client by emitting a socket event:
```
  socket.emit('message', row.new_val);
```

**Result:**

Once you write this query, you'll be able to see new messages be displayed as they are being added
