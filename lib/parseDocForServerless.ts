import * as fs from "fs";
import * as doctrine from "doctrine";
import * as YAML from "yamljs";
import * as glob from "glob";

export default function parse(files) {
	let res = {};
	for (const item of files) {
		const paths = glob.sync(item);
		for (const path of paths) {
			let obj = parseFile(path);
			res = {
				...res,
				...obj
			}
		}
	}
	return res;
}

function parseFile(file) {
	const data = fs.readFileSync(file, "utf-8");

	const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm

	const regexResults = data.match(jsDocRegex);
	let res = {};

	if (regexResults) {
		for (let i = 0; i < regexResults.length; i += 1) {
			const jsDocComment = doctrine.parse(regexResults[i], {unwrap: true});
			for (const tag of jsDocComment.tags) {
				if (tag.title === "serverless") {
					const obj = YAML.parse(tag.description)
					res = {
						...res,
						...obj
					}
				}
			}
		}
	}
	return res;
}
