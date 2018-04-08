const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const fs = require("fs");
const jsonBeautifier = require("./jsonBeautifier");

let tasks = Object.freeze({
    generateSchema: "generateSchema"
});

let placeholders = Object.freeze({
    version: "$$$VERSION$$$",
    cvars: "$$$1$$$",
    commands: "$$$2$$$"
});

gulp.task(tasks.generateSchema, () => {
    let version = 54

    return gulp
        .src("cryproj.partial.schema.json")
        .pipe(replace(placeholders.version, version.toString()[0] + "." + version.toString()[1]))
        .pipe(replace(placeholders.cvars, fetchCvars(version)))
        .pipe(replace(placeholders.commands, fetchCommands(version)))
        .pipe(rename("cryproj." + version + ".schema.json"))
        .pipe(jsonBeautifier("\t"))
        .pipe(gulp.dest("out/"));
});


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

/**
 * Run all
 */
gulp.task("default", [tasks.generateSchema]);