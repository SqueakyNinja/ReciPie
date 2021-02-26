Intro to Types and Basics

# Type Basics

### Type declaration

There are several ways we can declare type in TS

```ts
let word: string = "test";
let num: number = 101;
let words: string[] = ["this", "is", "an", "array", "of", "strings"];
let nums: number[] = [1, 2, 3, 4];
let bools: boolean[] = [true, false];
```

This is explicit Type Annotation, which let TS know the variable you have declared is going to be of a certain type,
we can also declare types and annotate variables with those types, this is _Type Aliasing_.

```ts
type Num = number;
let num: Num = 10;
```

The purpose of this becomes clearer when you consider that these types can be unions of types ...

```ts
type NumOrString = number | string;
let data = "test";
data = 0;
```

Our intention is that data should only be a `number` or a `string` and TS will allow us to reassign data to either.

### typing _shape_

Explicit type annotation and type aliasing can also be used to type objects, when we do this we generally refer to the type as the _shape_ of the object.

```ts
const person: { name: string; age: number; codes: boolean } = {
  name: "Jim",
  age: 32,
  codes: true,
};
// could also be typed as ...

type Person = { name: string; age: number; codes: boolean };
const otherPerson: Person = { name: "Alex", age: 30, codes: true };
```

### Unions and Intersections

Unions `|` and Intersections `&` for some types work exactly how you would expect, in the previous example it was a Union of string and number, however when combining complex type aliases it does nto function as 'or' but as a Union of the two types

```ts
type Dog = { legs: 4; name: string; tail: true; fur: true };
type Fish = { fins: number; name: string; tail: true; scales: boolean };

type FishOrDog = Fish | Dog;

const ohMy: FishorDog = {
  legs: 4,
  name: "billy",
  tail: true,
  fins: 4,
  scales: true,
};
```

This is a union of the two types, it complies with the structure of `Fish` but is also able to have the attributes of a `Dog`, in order to satisfy Typescripts type checker the declared object must fulfil at least the criteria for one of the unioned types.

Intersections of types require all the criteria that are in both types to satisfy the type check.

```ts
type Dog = { legs: 4; name: string; tail: true; fur: true };
type Fish = { fins: number; name: string; tail: true; scales: boolean };

type FishAndDog = Fish & Dog;

const fishDog: FishAndDog = {
  name: "billy",
  tail: true,
  fins: 4,
  scales: true,
  legs: 4,
  fur: true,
};
```

In order to truly understand how TypeScript behaves, we have to appreciate that types are related to one another
...

## Type Hierarchy

Take a look at the image below, this shows typescript will check wether or not a type satisfies its typecheck. This also follow how we understand some of how JS works, is an `Array` an `Object` yes, is a `function` also yes.

![typescript_type_hierarchy](./img/type_hierarchy.png)

Note the type `Any` sitting at the top of this list, `Any` can be .... anything except unknown. Why do we not just use any for all our definitions, because any can be anything it make ts behave like regular JS would and totally prevents the type checker from working.

```ts
const name: any = "Jim";
name.pizza();
```

So where is an appropriate use for `any` .... as a very, very, VERY last resort if you are unable to type something, avoid `any` wherever possible as it invalidates the hard work that we have put into type-ing our code.

## Functions

functions need to have their parameters and their return values typed

```ts
function add(a:number b:number):number{
    return a+b
}

function isGreaterThan50(n:number):boolean{
    return n > 50
}

function countChars(str:string, char:string):number{
    let count:number = 0
    for (let i:number=  0; i < str.length; i++ ){
        const shouldCount: boolean = str[i] === char
        if(shouldCount)count++
    }
    return count
}
```

## Call Signatures

Call signatures is a way for us to be able to type functions we have seen that you are able to type the params directly, you can also type the return values directly, but we can also type the whole function as a type alias

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => {
  return a + b;
};
```

we can only type alias function expressions, note: you no longer need to type the params as its noted in the signatures and ts will take their types from the signature.

## Index Signatures

Index signatures enable us to dynamically add key/value pairs to objects. The way the type checker reads this is, given an object all keys of type T must have values of type U

```ts
type EmailLookup = {
  [name: string]: string;
};

const lookUp: EmailLookup = {
  jim: "jim@jim.com",
  alex: "alex@alex.com",
};
```

## Type Inference

Having types everywhere can make you code feel quite cluttered, TS will also infer types for us in many circumstances, it can infer the types of declared variables and even function return values:

```ts
let name: 'Jim' //infers type string
const pi: 3.14  //when declaring a const will infer the variable is exactly 3.14

const person = {
  name: 'jim'
  age: 33,
  lovesToCode: true
}
// {name: string, age: number,lovesToCode: boolean}


//this will infer the return value of the function to be a boolean.
function hasAccess(person:{accessLevel:number}){
  return person.accessLevel > 2
}

```

## Type Level vs Value Level

Type level code can be described as the code that typescript is interacting with to ensure that the actions we take are TypeSafe, typescript asks does the value that you are giving conform to the type you have described

```ts
let password: string = "Password";
```

The part after the colon in the variable declaration is the layer of typescript that we are adding, and typescript is checking if the value (in this case `'Password'`) conforms to the type defined, which it does

When we go to use said variable later typescript will check that any method or properties can be called or accessed on that type.

```ts
//...
password.apples; // should show a TS error
password.toUpperCase(); // should be fine
```

The Type checking doesnt mind what the value of the variable is, other than that it conforms to `string`
Collapse
 2 2

