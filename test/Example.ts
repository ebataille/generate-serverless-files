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