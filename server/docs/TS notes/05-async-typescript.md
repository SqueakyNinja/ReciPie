# Async TypeScript

So far we have worked with TypeScript (TS) in a Synchronous way. Since the TS server can read the static code, it can mostly infer what the types of things are going to be which is great and saves us a whole load of time and effort!

When we are working with asynchronous code (e.g. web requests, database requests) the TS server just cannot make it up! We are forced to fill in the gaps.

A lot of async based libraries you use (including node) will come with types that will provide some level of type inference. This could be as part of the library itself or a TS `@types` folder from the "DefinitelyTyped" community.

## Callbacks

If you are constructing functions that accept callbacks, one way to provide a type-safe result is to provide a function type for the `callback` parameter:

```ts
import fs from 'fs';

type CatCallback = (
  error: null | string,
  cats?: { name: string; owner: string }[]
) => void;

function readCats(cb: CatCallback) {
  fs.readFile('./cats.json', 'utf8', (err, data) => {
    if (err) cb('File Read Error!');
    else {
      const cats = JSON.parse(data);
      cb(null, cats);
    }
  });
}

readCats((err, cats) => {
  //cats is inferred!!
  //do something with the type safe cats
});
```

## Promises

Most promise based libraries will work in similar ways in that they will provide you some way to type the result of the promise:

```ts
//...
const fetchLukePromise = () => {
  return axios.get<Character>('https://swapi.dev/api/people/1');
};

fetchLukePromise().then(({ data: luke }) => {
  console.log(`What beautiful ${luke.eye_color} eyes ${luke.name} has!`);
});
```

In this example the we can type the body of the `axios` response by providing them as a generic type parameter (in the crocodile brackets).

## Working with Databases

There are various ways we can interact with databases in TypeScript. Just like other external libraries they can often be JavaScript libraries that then require you to install types (@types/DefinitelyTyped) to to provide the generic functionality as seen above. There is so much TypeScript support out there nowadays that its difficult to find a library that doesn't either provide it's own types or provide you a way to get them elsewhere.

### Introducing Types to Knex

Knex is a Query Builder Library that comes with types installed, but we can augment the library with types created to match the schema of our database

In order to do this Knex requires us to declare an ambient module for the tables. Once we have declared this, wherever we use knex, the types for our database tables will come along for the ride...

```ts
import * as Knex from 'knex';

declare module 'knex/types/tables' {
  interface Character {
    readonly id: number;
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
  }

  interface Tables {
    characters: Character;
  }
}
```

...now when we try to select data from the `characters` table we have type-safe information for our data flowing through our application.

```ts
db('characters')
  .select('*')
  .from('characters')
  .then((result) => {
    const charOne = result[0]; //Character!
  });
```

We can augment this even further for situations where we update and amend the database by defining the table with `Knex.CompositeTableType`...

```ts
//...
declare module 'knex/types/tables' {
  //...
  interface CharacterInsert {
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
  }

  interface CharacterUpdate {
    height: number;
    mass: number;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: string;
  }

  interface Tables {
    characters: Knex.CompositeTableType<
      Character,
      CharacterInsert,
      CharacterUpdate
    >;
  }
}
```

This generic type accepts the types in the following order:
`Knex.CompositeTableType<BaseType, InsertType, UpdateType>`

This results in further type safety like so:

```ts
db('characters').update({ hair_color: 'green' }).where('id', 1); //missing required properties
```

And we now have type-safe interactions with our database!

## Typing the API Responses with Express

When building a backend, getting clear type information from the models/database is helpful. But how do we know if we are meeting the requirements for the data needed by the client? we need some contract with the frontend developers to say: "this is the structure on the api that our backend adheres to...". This is where we would want to type the schema for the api...

I want my response for my endpoint `/api/users/:user_id` to look like the following:

```ts
type UserResponseBody = {
  user = {
    user_id: number;
    eye_colour: string
    name: string;
  }
}
```

Express also allows for type inference to enforce this schema...

In my controller I can say that my controller is an `express.RequestHandler`

and provide it with the `UserResponseBody` like so...

```ts
export const getUserById: express.RequestHandler<
  { user_id: string },
  UserResponseBody
> = async (req, res) => {
  const { user_id } = req.params;
  const user = await selectUser(user_id);
  res.send({ user }); // enforced the type of the response sent!
};
```

If we make a mistake and change something about our response:

```ts
export const getUserById: express.RequestHandler<
  { user_id: string },
  UserResponseBody
> = async (req, res) => {
  const { user_id } = req.params;
  const user = await selectUser(user_id);
  res.send({ dinosaur: user }); // Argument of type '{ dinosaur: User; }' is not assignable to parameter of type 'UserResponseBody'
};
```

Perfect! we have a constant feedback that we are adhering to the contract/schema we set out from the beginning!

`express.RequestHandler` accept generic type arguments in the following order/format:

```ts
express.RequestHandler<
  ListOfParams,
  UserResponseBody,
  RequestBody
>
```

This means that if you are expecting any parameters on the request or any key/value pairs on the request body, you can also type these:

```ts
type UserRequestBody = {
  name: string
}
//...
express.RequestHandler<
  { user_id: string },
  UserResponseBody,
  UserRequestBody
>

