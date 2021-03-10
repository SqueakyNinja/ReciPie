# TypeScript Type Theory
To a beginner, TypeScript (TS) can feel really intuitive one minute and completely baffling the next. Today is about focussing on some of the finer details that can help us start to think like the TypeScript type checker.
## Types and their subtypes
On a fundamental level we already know that there are subtypes to types in JavaScript (JS). If we think back to our understanding of inheritance and the prototype chain. If I mention `Object` to you, you are likely already thinking of types that relate! `Array`s and `Function`s are complex types of value in JS, but they ultimately extensions of a JS `Object`. Therefore there is often an inherent relationship to the types we use in JS, and therefore in TS. The difference is is that TS type system will enforce rules about how the types behave/interact based on their relationship.
However on top of this, in order to think like TS, we have to make sense of how more complex (and seemingly unrelatable types) relate to one another. If we can describe variables in language such as "supertype" and "subtype" then we are one step towards understanding how one type is assignable to another. This concept is important for understanding the behaviour of other typed languages as well!
So it is agreed that a `function` type is a subtype of an `object` type. Yes?
`type object -> type function`
So what happens when we go more granular...?
```ts
type ObjTypeOne = object;
type ObjTypeTwo = { message: string };
```
`ObjTypeOne` is a type that is wide enough to fit all object types, whereas `ObjTypeTwo` can only fit values that are an object with a message key and a value of a string. They are both objects though, and they're related. `ObjTypeTwo` is a subtype of `ObjTypeOne`.
How about a tuple and an array?
```ts
type ObjTypeThree = string[];
type ObjTypeFour = [string, string];
```
The tuple is a subtype of the array
How about if we go even more granular...?
```ts
type OldUserType = { id: string | number };
type NewUserType = { id: number };
```
The above types are almost identical, and if we think about the values that could fit into these types, you could be fooled into thinking neither is more superior or subordinate than the other...
```ts
let userOne: OldUserType = { id: 1234 };
let userTwo: NewUserType = { id: 5678 };
```
Regardless of the values, their types are different, and one type is more superior than another. `NewUserType` is a subtype of `OldUserType`. But why?
There is a theme here, I promise. The easiest way to think about is is ultimately down to specificity. `NewUserType` is way more specific. Only an object with an id key of type number will fit in it, whereas `OldUserType` is so much broader. Notice again that they must be related since the same value will fit into both! If two types could fit the same value in it and yet one is more specific, then the more specific type is the subtype.
## Type Variance
TS, just like any other typed language has to have a set of rules to conform to to decide whether one value of a certain type can fit into another typed variable. Variance is a broader programming language concept that describes the way in which types (supertypes and subtypes) can be assigned to one another, if at all.
Can you fit a square peg in a round hole? It depends on the rules of variance. They are both shapes after all!
The rules in which a typed language can allow a value of a certain type to be assigned to another can be describe in the following ways:
**invariant** - Only a value of the same type can fit into a variable of a certain type.
**covariant** - A value of the same type or a subtype can fit into a variable of a certain type.
**contravariant** - A value of the same type or a subtype can fit into a variable of a certain type.
**bivariant** - A value of the same type or a subtype or a supertype can fit into a variable of a certain type.
TypeScript is largely **covariant** in it's behaviour, assuming you have strict mode on, as I have no doubt you do!
But why does all this matter? Well because it explains the following rather strange behaviour.... (To those of us new to typed languages anyway!)
Let's follow up on our user example:
```ts
let userOne: OldUserType = { id: 1234 };
let userTwo: NewUserType = { id: 5678 };
userOne = userTwo; //TS is happy!
```
However...
```ts
let userOne: OldUserType = { id: 1234 };
let userTwo: NewUserType = { id: 5678 };
userTwo = userOne; //Error! TS not so happy!
```
The contents of both variables is identical. We said that `NewUserType` was a subtype of `OldUserType`. Therefore `NewUserType` is assignable to `OldUserType`, but not vice versa.
If we think deeper about why this is, it makes sense why we might opt for this behaviour. A developer interacting with `NewUserType` knows the rules of play, they can use and interact (and reassign) the property id if they want to, but cannot do anything else. But, if that weren't the case, what's stopping someone retroactively changing the id property to a string... then we're in bug land!
```ts
let userOne: OldUserType = { id: 1234 };
userOne.id = '1234';
let userTwo: NewUserType = { id: 5678 };
userTwo = userOne; //Error! TS not so happy! Gosh thanks TypeScript! Life saver!
```
## Type Assignability
TypeScript is a mostly **covariant** language. Therefore type X is assignable to type Y if X is a subtype if Y.
Also it goes without saying that a dreaded `any` is assignable to anything! Perhaps all the more reason to avoid it where possible.
In order for TS to allow for one object type to be assignable to another object type, each of it's properties has to be a subtype/same as the type expected.
```ts
type subUser = { id: number; name: string };
type basicUser = { id: string | number; name: string };
type superUser = {
  id?: string | number;
  name: string;
};
const basicBish: subUser = { id: 123, name: 'alex' };
const legacyUser: superUser = {
  id: '1235',
  name: 'fred',
};
function logUserName(usr: basicUser) {
  console.log(usr.name);
}
logUserName(basicBish); //Fine since subUser has properties subtype of the required
logUserName(legacyUser); //Error: a superUser has properties supertype in comparison
```
## Function assignability
Functions are assignable to as long as:
- The return type is subtype/same (covariant)
- The parameter types are supertype/same (contravariant)
```ts
class Animal {} //super type
class Dog extends Animal {
  //basic type
  eat(food: string) {
    console.log('Chomp chomp on some', food);
  }
}
class Terrier extends Dog {
  //sub type
  yap() {
    console.log('yap');
  }
}
const superFunc = (d: Terrier) => new Animal();
const basicFunc = (d: Dog) => new Dog();
const subFunc = (d: Animal) => new Terrier();
function createDogAndFeed(dogReturner: (d: Dog) => Dog) {
  const newDog = dogReturner(new Dog());
  feed('bone', newDog);
  return newDog;
}
createDogAndFeed(subFunc);
createDogAndFeed(superFunc); //Error - superType - shape doesn't fit covariant model

