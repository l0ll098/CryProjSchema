const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const fs = require("fs");
const jsonBeautifier = require("./jsonBeautifier");

let tasks = Object.freeze({
    generateSchema: "generateSchema",
    generateSchemaForAllVersions: "generateSchemaForAllVersions"
});

let placeholders = Object.freeze({
    version: "$$$VERSION$$$",
    cvars: "$$$CVARS$$$",
    commands: "$$$COMMANDS$$$"
});

let engineVersions = [
    "52",
    "53",
    "54",
    "5dev"
];

function fetchCvars(version) {
    let content = fs.readFileSync("./in/consolecommandsandvars." + version + ".txt", "utf-8");
    let cvars = [];

    let rows = content.toString().split("\n\r");
    for (let i in rows) {
        let cvar;
        if (rows[i].split("variable: ")[1]) {
            cvar = rows[i].split("variable: ")[1].split(" ")[0];
            cvars.push(cvar);
        }
    }

    return cvars.join("\",\"");
}

function fetchCommands(version) {
    let content = fs.readFileSync("./in/consolecommandsandvars." + version + ".txt", "utf-8");
    let commands = [];

    let rows = content.toString().split("\n\r");
    for (let i in rows) {
        let command;
        if (rows[i].split("Command: ")[1]) {
            command = rows[i].split("Command: ")[1].split(" ")[0];
            commands.push(command);
        }
    }

    return commands.join("\",\"");
}

function generateSchema(version) {
    let engineVersion = version.toString()[0] + "." + version.substring(1, version.length);

    if (fs.existsSync("./in/consolecommandsandvars." + version + ".txt")) {
        return gulp
            .src("cryproj.partial.schema.json")
            .pipe(replace(placeholders.version, engineVersion))
            .pipe(replace(placeholders.cvars, fetchCvars(version)))
            .pipe(replace(placeholders.commands, fetchCommands(version)))
            .pipe(rename("cryproj." + version + ".schema.json"))
            .pipe(jsonBeautifier("\t"))
            .pipe(gulp.dest("out/"));
    } else {
        console.log("Skipping generation of the schema file for engine version " + engineVersion + " as the file containing the commands and cvars has not been found");
    }
}

/**
 * Generate the schema file for the dev engine
 */
gulp.task(tasks.generateSchema, () => {
    return generateSchema(engineVersions[engineVersions.length - 1]);
});

/**
 * Generate the schema file for every engine version.
 * If the commands and cvars dump file is not found, a message will be shown
 */
gulp.task(tasks.generateSchemaForAllVersions, () => {
    engineVersions.forEach((version) => {
        generateSchema(version);
    });
});

/**
 * Run all
 */
gulp.task("default", [tasks.generateSchemaForAllVersions]);