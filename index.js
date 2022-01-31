#!/usr/bin/env node

import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CURR_DIR = process.cwd();
const PROJECT_NAME = process.argv.slice(2)[0];

const createDirectoryContents = async (templatePath, newProjectPath) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach((file) => {
		const origFilePath = `${templatePath}/${file}`;
		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, "utf8");

			if (file === "ignore") file = ".gitignore";

			const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
			fs.writeFileSync(writePath, contents, "utf8");
		} else if (stats.isDirectory()) {
			fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

			createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
		}
	});
};

fs.access(`${CURR_DIR}/${PROJECT_NAME}`, (err) => {
	if (err) {
		if (!PROJECT_NAME) {
			console.log("Нужно указать название папки");
			return;
		}
		fs.mkdirSync(`${CURR_DIR}/${PROJECT_NAME}`);
		createDirectoryContents(`${__dirname}/src`, PROJECT_NAME);
	} else {
		console.log("Папка уже существует");
	}
});
