# Generic Types

If you are building a JS/TS library or just creating functions that are somewhat generic in their behaviour, you will no doubt stumble across a time when you cannot predict a specific input type. This is where "generic" types comes in.

If you were building a filter function (e.g. array.prototype.filter)... for example one which behaves like so:

```ts
const outputOne = filter(['string', 'another string', 'string'], (item) => {
  if (item[0] === 's') return true;
  else return false;
}); //output inferred as a string[] :)

const outputTwo = filter([2, 1, 4, 5], (num) => {
  if (num % 2 === 0) return true;
  else return false;
}); //output inferred as a number[] :)
```

...you would be hard pressed to figure out a way to make this function type-safe without generic types. You would likely end up writing every single call signature variation for every input/output imaginable.

```ts
function filter(arr: string[], pred: (ele: string) => boolean): string[];
function filter(arr: number[], pred: (ele: number) => boolean): number[];
function filter(arr: boolean[], pred: (ele: boolean) => boolean): boolean[];

function filter(
  arr: (string | number | boolean)[],
  predicate: (item: any) => boolean
) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const isAKeeper = predicate(element);
    if (isAKeeper) output.push(element);
  }
  return output;
}
```

While this solution does allow for an inferred return type based on the input, it falls short when introducing more complex inputs. What if we wanted our filter function to accept something other an an array of primitive types? For example an array of Users. We would then have to create yet another function overload

```ts
//...
type User = { id: number; name: string; faveSnack: string };
function filter(arr: User[], pred: (ele: User) => boolean): User[];

const users = [
  { id: 1, name: 'Alex', faveSnack: 'Minty Biscuit' },
  { id: 2, name: 'Jim', faveSnack: 'Hob Nob' },
];

const viscountLovers = filter(users, (user) => {
  return user.faveSnack === 'Minty Biscuit';
}); // Hurrah!
```

Things start to get very complicated very quickly, and all for the benefit of maintaining type-safe code. We are also forgetting that `filter` is generally a much more generic function than this. It should allow for any array of a certain type and return an array of a certain type.

## A more flexible function ("generic")

Lets break down the requirements of filter and then look into how "generic" types can solve our problems

Filter should accept:

- An array where all elements are of the certain type
- A predicate callback which should accept an element from the array (same type), and return a boolean (For simplicities sake, let's forget the additional predicate args).

Filter should return:

- A filtered array where all the elements are the same type as those passed in.

Let's see our filter function instead as a generic type:

```ts
function filter<T>(arr: T[], pred: (ele: T) => boolean): T[];

function filter(arr, predicate) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const isAKeeper = predicate(element);
    if (isAKeeper) output.push(element);
  }
  return output;
}
```

The generic typed function now only has one call signature. Firstly this means we could just simply write it all in one declaration like so:

```ts
function filter<T>(arr: T[], predicate: (ele: T) => boolean): T[] {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const isAKeeper = predicate(element);
    if (isAKeeper) output.push(element);
  }
  return output;
}
```

With this, we still achieve the type-safety of **inferred return types** when we invoke the function

```ts
//...
type User = { id: number; name: string; faveSnack: string };

const users: User[] = [
  { id: 1, name: 'Alex', faveSnack: 'Minty Biscuit' },
  { id: 2, name: 'Jim', faveSnack: 'Hob Nob' },
];

const output = filter(users, (user) => {
  // 1). user inferred as type User!
  return user.faveSnack === 'Minty Biscuit';
}); // 2). output inferred as a User[]!!
```

We also achieve a **greater flexibility** since the input can now be any variation of an array!

## How to create a generic function

In order to create a generically typed function, **you need to use angle brackets** ('<>') beside the function name and pass in any comma separated generic type names you plan on using in the call signature. These can be named in any way you please, however **by convention generally start as the capital letter T**, and go up alphabetically.

```ts
function returnLastArg<T, U, V>(
  argOne: T,
  argTwo?: U,
  argThree?: V
): T | U | V {
  if (argThree !== undefined) return argThree;
  if (argTwo !== undefined) return argTwo;
  else return argOne;
}
```

## Tl;DR

- Generic Types allow for more generic inputs for function (perhaps where the input in somewhat unknown) whilst maintaining type-safety by allowing the type checker to infer return types from the inputs on invocation.
- Define the generic names of those generic types within angle brackets `function sayName<T, U>` in the call signature. Conventionally these would start at the letter T and work up the alphabet.
- You can use those predefined generic types in the call signature as you would any other type `function func<T>(arg: T): T {}`

