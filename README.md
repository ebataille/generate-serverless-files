# generate-serverless-files
This project helps to generate serverless files

This project is inspired by [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and the post of [@dwelch2344](https://github.com/serverless/serverless/issues/4218#issuecomment-361760059)

[![NPM](https://nodei.co/npm/generate-serverless-files.png)](https://www.npmjs.com/package/generate-serverless-files)

## installations

```
npm install --save generate-serverless-files
```

## how It works

It parse the documentation in your files to give them to serverless when you use
```shell script
serverless deploy
```

## Getting Started
### Write a js generator

create a js (```serverless-dynamic.js``` for example) file and put this code :

```javascript
const parse = require("generate-serverless-files");

module.exports = () => {
	return parse(["*.ts"]);
}
```
### Include in the serverless.yml

In your main ```serverless.yml``` file import the previously created file

```yaml
service: example

provider:
  name: aws
  runtime: nodejs12.x
  region: eu-west-3
  memorySize: 128
  timeout: 10


functions: ${file(./serverless-dynamic.js)}
```

### Write the doc

in your code, writes the serverless configuration in the documentation

```typescript
import {body, Controller, custom, header, Method, param, query} from "@igloobuster/aws_lambda_middleware/dist/Annotations";

@Controller({exports, json: true, router: new Router(middlewares)})
export class Example {

	/**
	 * @serverless
	 *	getExample:
	 *     handler: routes/Example.getExample
	 *     events:
	 *       - http:
	 *           path: /example
	 *           method: get
	 */
	@Method()
	private async getExample() {
		return {Hello: "world"};
	}

	/**
	 * @serverless
	 *	postExample:
	 *     handler: routes/Example.postExample
	 *     events:
	 *       - http:
	 *           path: /example
	 *           method: post
	 */
	@Method()
	private async postExample() {
		return {Hello: "post to the world"};
	}

}
```

All the lines bellow @serverless will be used for the configuration