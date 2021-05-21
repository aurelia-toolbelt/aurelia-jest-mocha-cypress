To add `Mocha/Chai/Sinon` beside `Jest` in an official Aurelia v1's `Jest/Cypress` template so follow below steps:

1. Change current configs to make it possible to add `Mocha` beside it.

	* Rename `test/unit` folder to `test/unit-jest`.
	* Change `Options.relativeToDir = path.join(__dirname, 'unit');` line inside `test\jest-pretest.ts` to `Options.relativeToDir = path.join(__dirname, 'unit-jest');`.
	* Change `"test": "au test",` inside `package.json` to `"test-jest": "au test",`.
	
2. Create a clone of `tsconfig.json` with name of `tsconfig.mocha-test.json` in root directory with these new changes

```js
"module": "commonjs",
"target": "es6",
```

3. Add the below config to to the `package.json` file and `jest` section.

```js
"jest": {

    "roots": [
      "./test/unit-jest"
    ],
	
}	
```

4. Install the below packages

```
npm install -D ts-node mocha chai sinon nyc @types/mocha @types/chai @types/sinon
yarn add -D ts-node mocha chai sinon nyc @types/mocha @types/chai @types/sinon
```

5. Create a new folder for `Mocha` tests `test/unit-mocha`.

6. Create `.mocharc.js` file in root directory with the following content

```js
'use strict'

module.exports = {  
  exit: true,
  timeout: '3000',
  recursive: true,
  file: ['./test/mocha-pretest.js'],
  spec: "test/unit-mocha/**/*.ts"
}
```

7. Create `mocha-pretest.js` inside `test` folder. (Should be `.js`)

```js
require("ts-node").register({
  project: "tsconfig.mocha-test.json",
});
```

8. To use Istanbul (nyc) coverage tool with Mocha, we need to add new `nyc` section into the `package.json`.

```js
"nyc": {
  "extension": [
    ".ts",
    ".tsx"
  ],
  "include": "src",
  "exclude": [
    "**/*.d.ts"
  ],
  "reporter": [
    "html",
    "text"
  ],
  "all": true,
  "report-dir": "test/coverage-mocha"
}
```

9. Add the following command to `package.json` file and `scripts` section.

`"test": "node_modules/.bin/nyc mocha"`

Although, you can separate the test and coverage like the following:

```
"test": "node_modules/.bin/mocha"
"coverage": "node_modules/.bin/nyc mocha"
```

Now, the coverage test result will be available under `test/coverage-mocha` directory.

10. Just like the Jest version, create a new `app.spec.ts` file for testing inside the `test/unit-mocha` directory.

```js
import {App} from '../../src/app';
import { expect } from "chai";

describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).to.equal('Hello World!');
  });
});
```

Tip: Maybe you see some Typescript errors in your project so add the following config to your main TypeScript configuration (`tsconfig.json`).

```js
"exclude": [ "test/coverage-jest", "test/coverage-mocha", "test/mocha-pretest.js" ],
```

and also check do you have the `iterable` config for working with Cypress without problem or not.

```js
"lib": [
    // ...
    "es2015.iterable",
    // ...
],
```
