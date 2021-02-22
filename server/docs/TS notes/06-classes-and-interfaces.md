# Classes and Interfaces

## Classes

In JS Classes are syntactic sugar over the prototype/constructor method of object creation. On top of that TS has built in some useful flags that help us clear up some of the issues that come with OOP in JS

### Abstract Class

abstract is a keyword that prefaces the class constructor indicating that it cannot be instantiated on its own, it exists to act as a super-class.

```ts
abstract class Animal {
  legs: number;
  hair: boolean;
  constructor(legs: number, hair: boolean) {
    this.legs = legs;
    this.hair = hair;
  }
}

const animal = new Animal(4, true); //-----> Nice TS error (TS2511: Cannot create an instance of abstract class)
```

We never want an instance of `Animal` we want ... `Dog`, `Cat`, `Bird` etc.
In the abstract class we can define methods that we want to either pass to all instances or declare abstract methods that you wish to define specific implementations of down the line.

```ts
  INSERT EXAMPLE OF ABSTRACT METHOD AND AN INHERITED METHOD???
```

### Access modifiers

It is often suggested that JS is unable to provide sufficient encapsulation as all the properties of an object can be reassigned directly,
TS has created Access modifiers, keywords that can be put at the point of class declaration that will cause type level errors if they are accessed inappropriately

- `public` Accessible from anywhere. This is the Default level access
- `protected` Accessible from instances of this class and its sub-classes
- `private` Accessible from only instances of this class only
- `readonly` This is not just for classes but prevents reassignment all together

## Interfaces

Interfaces are an alternate way of creating types in TS, you will generally see classes and interfaces together, this is both by convention as they act in a similar way to how many static typed languages implement classes and because of some of the features that interfaces have over types.

Type aliases and interfaces are mostly 2 syntaxes for the same thing ... consider the below example.

```ts
type Sandwich = {
    bread: "wholemeal"| "granary"|"sour dough";
    filling: string;
    tasty:boolean
}
// this could be rewritten as an interface

interface Sandwich = {
    bread: "wholemeal"| "granary"|"sour dough";
    filling: string;
    tasty:boolean
}
```

Everywhere the Type alias was used you can use the interface instead, they both define shape and those shapes are assignable to each other (they are exactly the same in fact)

Where we could ensure Types were assignable to other types and something else using the `&` operator, using interfaces we can nearly equivalently use `extends`

```ts
type Person = { name: string; age: number };
type Northcoder = Person & { lovesToCode: true };
// rewritten as an interface

interface Person {
  name: string;
  age: number;
}
interface Northcoder extends Person {
  lovesToCode: true;
}
```

N.B interfaces don't have to just extend other interfaces, they extend any shape.

### 3 notable differences

- interfaces are more specific

  While types can represent both complex and singular, an interface can only be used to represent an object of classes shape.

  ```ts
  type A = number | string; /// you cant do this with an interface
  ```

- TS checks assignability

  When extending interfaces, TS will ensure the interface you are extending is assignable to your extension

```ts
interface Person { name: string; age: number, hobbies:string[] }
interface Northcoder extends Person = {
    hobbies: "only coding" // ----> TS will provide an error as 'only coding' is not assignable to string[]
}
```

- declaration merging

When you declare multiple interfaces with the same namespace in the same scope, they are automatically merged.

```ts
interface Person {
  name: string;
}
//Person has a single filed, name

interface Person {
  age: number;
}
// User now has 2 fields, name and age
```

This can still cause TS errors if the interfaces conflict.

## Implementations

You can use the `implements` keyword to say that a class must satisfy a particular interface, this is a useful way to add some type-level checks on the structure of your classes.

```ts
interface Person {
  greet(name: string): void;
  eat(food: string): void;
}

class Coder implements Person {
  eat(food: string) {
    console.log(`Coder shovels ${food} in their face`);
  }
  greet(name: string) {
    console.log(`Hi ${name}, I am coding`);
  }
}
```

Coder must implement all methods on the Person interface, it can implement more if it needs to.

Whilst interfaces cant use access modifiers they can mark properties as readonly

```ts
interface Person {
  greet(name: string): void;
  eat(food: string): void;
}
```

you are also able to implement multiple interfaces ...

```ts
interface Hacks {
  hack(codeBase: string): void;
}
class Coder implements Person, Hacks {
  eat(food: string) {
    console.log(`Coder shovels ${food} in their face`);
  }
  greet(name: string) {
    console.log(`Hi ${name}, I am coding`);
  }
  hack(codebase: string) {
    console.log(`hacking at ${codebase} ... hack hack hack!`);
  }
}
```

## Structural typing

It is important to note that just like everything else in TS because the types built into classes and interfaces are all type level, TS still compares classes by their structure. This is important to note as people coming from other static typed languages may expect that classes are nominally typed.

```ts
class Hippo {
  swim() {
    //...
  }
}
class Fish {
  swim() {
    //...
  }
}
function swimAbout(animal: Fish) {
  animal.swim();
}

let nemo = new Fish();
let george = new Hippo();

swimAbout(nemo);
swimAbout(george);

