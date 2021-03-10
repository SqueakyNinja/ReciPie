# Compiler and Project Setup

TypeScript is often described as a "typed superset of JavaScript".

Therefore in order to make sense of TypeScript (TS), we first need to add context and think about JavaScript (JS) for a moment.

JS is often compiled and ran in a JS engine (V8 for Node/Chrome). We generally don't think much of the JS compilation, since it happens "Just In Time" before it's ran. Although TS pre-processors (e.g. TS-node) allow for similar behaviour as Node/Browser JS, TS still introduces a compilation phase if we want to generate code for production.

TypeScript should be though of as a combination of two things:

- A compiler of TS to JS
- A Type Checker

But more generally it's a developer tool. Since the production code is JS...

## Compilation

A compiler is fundamentally a program that converts code from one language to another. In JS compilation that would be converting JS source to bytecode for the computer to interpret. The compilation phase that TS brings is TS source down to good old JavaScript Source.

```md
**TypeScript Source** --TS-compiler--> **JavaScript Source** --JS-compiler--> **bytecode**
```

This brings us 2 advantages when coding in TS:

- We can write our TypeScript source using the latest EcmaScript Specifications
- We can output our JavaScript source according to the EcmaScript Specifications of our choice

The TypeScript Compiler (TSC) will still run the type checker during compilation, but it's important to note that this won't prevent the TSC from creating the JavaScript Source

As TS developers we still need to maintain an understanding of JS. Our code will still be run in production as JS.

## Basic Project Setup

Common folder structure:

```
-dist/
-src/
-tsconfig.json
-package.json
.gitignore
```

### ./dist (distributable) directory

- This will be contain the output from the tsc compiler (JS code)
- You will want to `.gitignore` this folder, since your TS code is the main source of code truth. You don't need two!

### ./src (source) directory

- This will contain all of your TS code to be compiled

### .gitignore

- You'll want to ignore your compiler output (`./dist`)
- You'll also want to ignore `node_modules`

### .tsconfig.json

- The source of truth for the TS compiler and TS server. The kinds of code prompts will appear in your code will depend on the compiler options you select in here.
- You should always (at least) aim for `strict` compiler option set to true. This way you get the best out of TS.
- You will need to define what EcmaScript standard you want TS to compile down to.
- You may need to define what libraries you're using so that TS can recognise them (e.g. 'dom') by using the `lib` setting.
- `includes` option tells TS what files/folders to include in compilation
- `excludes` option tells TS what files/folders to not include (e.g. `node_modules`)
- You'll need an output directory for the compilation (`outDir`).

There are far too many customisable things in the tsconfig that you could list here, but it ultimately depends on the scenario.

### TypeScript dependancies

You will need to install a few thing TS related in most TS projects:

- `typescript` itself. This is the compiler that converts your code to JS
- install any dependency types that you don't have. See the "DefinitelyTyped" community for more details. An example of this might be if you are working with node library you'll want to install the types for that like so: `npm install -D @types/node`

typescript dependencies will normally be developer dependencies since they are not used in production (JS) code.

## JS to TS conversion

When converting to TS from JS you'll want to introduce TS gradually. Be sure to include all of the required setup files/folders.

Convert to TS by doing the following:

- firstly using the `allowJS` tsconfig flag to accept .js files.
- You'll then want to convert files to `.ts` starting at the periphery of your project (i.e. the "leaf-node" files in your directory structure).
- Be sure to graduate the introduction of TS strict settings. Don't just jump straight to `strict: true`. Maybe start with `noImplicitAny` and go on from there

## Resources

Be sure to check out https://www.typescriptlang.org/ if you haven't already. This should be your main resource for TS.

