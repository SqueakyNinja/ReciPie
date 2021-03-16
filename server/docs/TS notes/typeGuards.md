# Type Guards

A type guard is both a way to narrow a type inside a conditional block. Sometimes we are working with functions that have multiple given types and we need to access certain methods that we might not have access to on both.

### Working with primitive types

```ts
function add(a:number|string b:number|string){
    if(typeof a === "string" && typeof b === "string"){
        return a.concat(b)
    }
    if(typeof a === "number" && typeof b === "number"){
        return a + b
    } else {
        throw new Error("Invalid arguments. Both Args must be either numbers or strings")
    }
}
```

When we use `typeof` typescript will understand that inside the `if` block both `a` and `b` must be of a certain type so we can use type specific methods on the variables.

We know that Typescript is a layer to apply over our code to help developers accidentally creating runtime errors, however now we are linking out types functionality to the runtime.

### Asserting classes

Where `typeof` wouldn't work would be if we were trying to type complex objects, for classes we can use `instanceof`

```ts
class Admin (){
    doAdminStuff(){
        console.log("admin stuff!!")
    }
}
class Customer(){
    hasCredit():boolean{
        return true
    }
}
type User = Admin | Customer

function reportActions(user:User):string{
    let message:string
    if(user instanceof Admin){
        message = "Admin has done admin stuff"
    }
    if(user instanceof Customer){
        message = user.hasCredit ? "Customer was able to buy": "Customer had credit issues "
    }
    return message
}
```

### Asserting type with is

We can extract our type asserting functionality out to a new function. These functions must return a `boolean` and where we would define the return value we can return a type assertion using the `is` key word.

```ts
//..

function isCustomer(user: User): user is Customer {
  return user instanceof Customer;
}

function reportActions(user: User): string {
  let message: string;
  if (isCustomer(user)) {
    message = user.hasCredit()
      ? "Customer was able to buy"
      : "Customer had credit issues ";
  } else {
    message = "Admin has done admin stuff";
  }
  return message;
}
```

ts will assert that if its not a customer then it must be a Admin and we can return based on that assertion.

### user defined type guard

It becomes more difficult to assert types when we are working with our own defined `types` or `interfaces` outside of classes.

We can then create our own user defined type guards as before but we need to look for a clear way to ensure we are asserting the correct type.

```ts
interface Dog  {
    name:string;
    size: string
    woof:()=>void
}
interface Terrier extends Dog = {
    size:"small"
    yap:()=>void;
}

function speak(dog:Dog){
    if(isTerrier(dog)){
        dog.yap()
    } else {
        dog.woof()
    }
}

function isTerrier(dog:Dog):dog is Terrier{
    return dog.size === "small"
}

```
