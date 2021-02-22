# Typerannosaurus Backend

## Overview

Your mission is to build out this backend to service a Frontend for Paleontologists and Dinosaur Enthusiasts alike. When a Paleontologist makes a new Dinosaur discovery, they'll be sure to use our finished Typerannosaurus Application to track the findings! ;)

This api is built using [express](https://expressjs.com/) and [knex](http://knexjs.org/). You may find the docs for these useful!

## Developer setup

If you have an installation of Postgres on your system then try the following steps:

1. `npm run setup-dbs`
2. `npm run migrate-latest`
3. `npm run seed`

If you don't have an installation or you are having issues with this setup please ask a tutor for a hosted database connection string!

Then you're on you're way and you can run:

- `npm run dev`

## API Requirements

Unless otherwise stated, the api must respond in the following format on the body of the response:

- A key (noun) describing the resource being requested, pluralised if necessary
- The value should be a data`object` or an `array` of data objects depending on the whether the endpoint responses with more than one resource

For example:

GET `/api/epochs` would respond with the following body structure:

```json
{
  "epochs": [{...}, ...];
}
```

GET `/api/users/123456` would respond with the follows body structure:

```json
{
  "user": {...}
}
```

Other keys value pairs can be attached to the body at a later time if required.

## Instructions

First things first, you will need to create the Database Schema...

### Part 1. Create the Database Schema

In order for `knex` to infer the correct types when we are interacting with the database, we want to feed in a db schema ('./src/db/types'). See [here](http://knexjs.org/#typescript-support) for more details

### Part 2: Endpoints

When building out each endpoint you will want to do the following:

- Create a type of the required response body for the endpoint in the API Schema ('./common/api-schema')
- Build the logic for the controller and model functions for that endpoint
- Make use of the express generic type functionality (e.g. `express.requestHandler<...>`) to ensure type safety
- Assume parameters and/or keys on request bodies are always provided by the client.

Be sure to make the best use of types throughout. There should be **no** variables either explicitly set by you, or by the libraries, set to type `any`!

Complete the following endpoints:

#### `GET /api/users/:user_id`

Should returns a single user (with all available information) with provided user_id

#### `GET /api/dinosaurs`

Should responds with all dinosaurs but with only limited data on each dinosaur in the following format:

```json
{
  "dinosaurs": [
    {
      "dinosaur_id": "noeyeddinosaur...",
      "temporal_range_description": "Jurassic Park",
      "species_name": "Doyouthinkhesaurus",
      "diet": "Carnivore",
      "horns": true,
      "likes": 1
    },
    {...}
  ]
}
```

#### `PATCH /api/dinosaurs/:dinosaur_id`

Should accept a body with dinosaur likes to increment. This can also be a negative/positive integer.

```json
{
  "likes": 2
}
```

...and should increment the dinosaur with provided id

It should respond with a limited response body like the following:

```json
{
  "dinosaur": {
    "dinosaur_id": "123345...",
    "likes": 23
  },
  "likes_incremented": 2
}
```

#### `GET /api/dinosaur/:dinosaur_id`

Should respond with all available information about the dinosaur with that dinosaur_id

#### `GET /api/epochs`

Should respond with all available information about all the epochs

### Part 3. Extra Tasks

#### a.) Add some filtering capability/queries to `/api/dinosaurs`

The endpoint should be able to do the following:

- Accept `/api/dinosaurs?after_in_ma=150` and respond with dinosaurs discovered after 150 million y.a.
- Accept `/api/dinosaurs?before_in_ma=100` and respond with dinosaurs discovered before 100 million y.a.
- Accept both in the same request `/api/dinosaurs?after_in_ma=150&before_in_ma=100`

#### b.) Add a new key to Epochs Response

Introduce a new key on each epoch data object to represent the number of dinosaurs discovered to have existed in that epoch.

#### c.) Error Handling

We cannot always guarantee a request coming in will be in the format we want...

For endpoints that accept a request body, assume that they won't always provide the required keys and set the express request body type to a `Partial<MyReqBody>`. You will likely have to introduce some validation in order to stop TypeScript complaining.
