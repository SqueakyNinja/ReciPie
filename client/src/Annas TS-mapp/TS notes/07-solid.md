# S.O.L.I.D design principles for Object Oriented Design Paradigm

SOLID is an acronym for a set of guiding principles that aim to guid how we design OOP applications to help them be easier to maintain and scale.
It is of note that these are principles not hard and fast rules about how to build OOP software.

## Single responsibility

This suggests that a class should have only one reason to change, the aim here is top reduce the impact of changes and problems that might arise from those changes.

```ts


class ActivityTracker {
  targetActivity: number;
  currentActivity: number;
  constructor(targetActivity: number) {
    this.targetActivity = targetActivity;
    this.currentActivity = 0;
  }
  trackActivity(activityPoints: number) {
    this.currentActivity += activityPoints;
    if (this.currentActivity > this.targetActivity) {
      console.log("congrats you're smashing your goal!");
    }
  }
}


```

Reasons this could change:

- we change how we track or add Activity
- we change how we log our messages

```ts
class ActivityTracker {
  targetActivity: number;
  currentActivity: number;
  notify: Notifications;
  constructor(targetActivity: number) {
    this.targetActivity = targetActivity;
    this.currentActivity = 0;
    this.notify = new Notifications();
  }
  trackActivity(activityPoints: number) {
    this.currentActivity += activityPoints;
    if (this.currentActivity > this.targetActivity) {
      this.notify.msg("congrats your smashing your goal!");
    }
  }
}

class Notifications {
  msg(msg: string) {
    console.log(msg);
  }
}
```

By extracting out the notification to a new class if there needed to be changes to how we notify people, then `Notifications` can be changes but if we changes the rules of how we work out activity we would change the `ActivityTracker`.

When creating classes we should think about where changes may come from in the future and try to build solutions that dont have methods that change for different reasons in the same class

## Open/Closed

The open/closed principle suggests that classes should be open to extension but closed for modification.
This means that when we want to add new features to our application we shouldn't have to modify existing code, but instead we should have built in a way which allows us to extend what is already there.

Consider the following example, if our team wanted to add a feature allowing us to deal with circles, could we extend this, or would we have to modify it?

```ts
class Rectangle {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}

function logAreas(shapes: Rectangle[]) {
  shapes.forEach((shape: Rectangle) => {
    console.log(shape.height * shape.width);
  });
}
```

Here is an implementation that does not conform to the open closed principle

```ts
class Rectangle {
  height: number;
  width: number;
  type: string;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.type = "rectangle";
  }
}
class Circle {
  radius: number;
  type: string;
  constructor(radius: number) {
    this.radius = radius;
    this.type = "circle";
  }
}

function logAreas(shapes: Rectangle[] | Circle[]) {
  shapes.forEach((shape: Rectangle | Circle) => {
    if (isRectangle(shape)) console.log(shape.height * shape.width);
    else {
      console.log(shape.radius * shape.radius * Math.PI);
    }
  });
}

function isRectangle(shape: Rectangle | Circle): shape is Rectangle {
  return shape.type === "rectangle";
}
```

if we later need to add more shapes, it involves more and more modification to existing code, which means more chance of creating bugs and difficult to maintain code.

```ts
interface Shape {
  logArea(): void;
}
class Rectangle implements Shape {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
  logArea() {
    console.log(this.width * this.height);
  }
}

class Circle implements Shape {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  logArea() {
    console.log(this.radius * this.radius * Math.PI);
  }
}
function logAreas(shapes: Shape[]) {
  shapes.forEach((shape: Shape) => {
    shape.logArea();
  });
}
```

Here if we are asked to add more shapes we can do so with ease provided they implement the shape interface to ensure they can `logArea`.

## Liskov substitution

The Liskov substitution principle suggests that derived classes must be usable through the base class interface without the user being able to tell the difference.
What does this mean? it
This in practice means that if a user would be using a base class, if we were to instead pass a subclass it should have no impact.
Sorry more shape examples...

```ts
class Rectangle {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
  changeWidth(newWidth: number) {
    this.width = newWidth;
  }
  changeHeight(newHeight: number) {
    this.height = newHeight;
  }
}

class Square extends Rectangle {
  constructor(height: number) {
    super(height, height);
  }
  changeHeight(newHeight: number) {
    this.height = newHeight;
    this.width = newHeight;
  }
  changeWidth(newWidth: number) {
    this.height = newWidth;
    this.width = newWidth;
  }
}
```

Whilst we can make a reasonable argument, especially using logic that all squares are in fact also rectangles, the code as it stands breaks this principle.
were we to pass a user a square and they expected a rectangle, is it reasonably they change the height and the width also changes?
No, the argument here goes against normal logic, Rectangle and Square do no have a parent/child relationship arguably, Square and Rectangle could inherit from a Shape class, but they are both different, Square has only 1 Param, where as Rectangle 2. Rectangle needs 2 functions to change its size, Square only 1. They really aren't as closely connected as we think.

## Interface segregation

This principle centers around the idea of not creating bloated interfaces that will ultimatley reduce the flexibility of your code or lead to writing redundant or duplicate code.
We should aim to make our interfaces small and specific. A guiding line if you would like is that every implementation of an interface should use all aspects of it.

```ts
interface Entity {
  health: number;
  attackDamage: number;
  speed: number;
  move(): void;
  attack(target: Entity): void;
  takeDamage(damage: number): void;
}

class Goblin implements Entity {
  health: number;
  attackDamage: number;
  speed: number;
  constructor() {
    this.health = 10;
    this.attackDamage = 2;
    this.speed = 5;
  }
  move() {
    console.log(`moves ${this.speed}`);
  }
  attack(target: Entity) {
    target.takeDamage(this.attackDamage);
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}

class SpikeTrap implements Entity {
  health: number;
  attackDamage: number;
  speed: number;
  constructor() {
    this.health = 10;
    this.attackDamage = 2;
    this.speed = 0;
  }
  move() {
    console.log(`cant move`);
  }
  attack(target: Entity) {
    target.takeDamage(this.attackDamage);
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}

class Door implements Entity {
  health: number;
  attackDamage: number;
  speed: number;
  constructor() {
    this.health = 10;
    this.attackDamage = 0;
    this.speed = 0;
  }
  move() {
    console.log(`cant move`);
  }
  attack(target: Entity) {
    console.log("doors cant attack soz");
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}
```

In this thrilling video game we've made all in game objects are Entities, but many of the classes aren't using all of the requirements of the class, this has created a dependancy on each of the SpikeTrap and Door classes that could cause fragility later if we change the call signature of move or attack(in doors case). In truth we dont need those props or methods on those classes. If we break this one large interface into smaller more flexible ones, consider how much easier the code is to read, and how much more scalable it is if we were adding more and more features

```ts
interface Entity {
  health: number;
  takeDamage(damage: number): void;
}
interface Attacks {
  attackDamage: number;
  attack(target: Entity): void;
}
interface Moves {
  speed: number;
  move(): void;
}

class Goblin implements Entity, Attacks, Moves {
  health: number;
  attackDamage: number;
  speed: number;
  constructor() {
    this.health = 10;
    this.attackDamage = 2;
    this.speed = 5;
  }
  move() {
    console.log(`moves ${this.speed}`);
  }
  attack(target: Entity) {
    target.takeDamage(this.attackDamage);
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}

class SpikeTrap implements Entity, Attacks {
  health: number;
  attackDamage: number;
  constructor() {
    this.health = 10;
    this.attackDamage = 2;
  }
  attack(target: Entity) {
    target.takeDamage(this.attackDamage);
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}

class Door implements Entity {
  health: number;
  constructor() {
    this.health = 10;
  }
  takeDamage(damage: number) {
    this.health -= damage;
  }
}
```

### Dependency inversion

The main takeaway from this principle is that we shouldnt have our high level modules be reliant on low level implementations. This concept is often abstracted to a real world example:

```ts
class Button {
  lamp: Lamp;
  constructor(lamp: Lamp) {
    this.lamp = lamp;
  }
  press() {
    this.lamp.isOn ? this.lamp.switchOff() : this.lamp.switchOn();
  }
}

class Lamp {
  isOn: boolean;
  constructor() {
    this.isOn = false;
  }
  switchOn() {
    this.isOn = true;
  }
  switchOff() {
    this.isOn = false;
  }
}
```

in this example our button is reliant on lamp, as it uses its methods directly. It is dependant on our implementation of lamp.

```ts
class Button {
  thing: Switchable;
  constructor(thing: Switchable) {
    this.thing = thing;
  }
  press() {
    this.thing.isOn ? this.thing.switchOff() : this.thing.switchOn();
  }
}

class Lamp implements Switchable {
  isOn: boolean;
  constructor() {
    this.isOn = false;
  }
  switchOn() {
    this.isOn = true;
  }
  switchOff() {
    this.isOn = false;
  }
}

interface Switchable {
  isOn: boolean;
  switchOn: () => void;
  switchOff: () => void;
}
```

because our button relies on an abstraction, it now doesn't rely on the implementation of lamp. If lamp changes, it doesn't effect our higher level module of Button.


