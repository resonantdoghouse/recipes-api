# Express Dev Jokes API

## Routes

For posting, deleting and putting you will need to provide an `api_key`. 
You can pass this using a query string, for example `?api_key=neocat`

### Get

- /jokes
- /jokes/:id

### Post

- /jokes
    body should include, `question` and `answer`

### Put

- /jokes/:id

### Delete

- /jokes/:id
