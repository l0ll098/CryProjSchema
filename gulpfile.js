const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const fs = require("fs");

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
        .pipe(replace(placeholders.cvars, () => {

            content = fs.readFileSync("./in/consolecommandsandvars." + version + ".txt", "utf-8");
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
        }))
        .pipe(replace(placeholders.commands, ()=>{
            content = fs.readFileSync("./in/consolecommandsandvars." + version + ".txt", "utf-8");
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
        }))
        .pipe(rename("cryproj." + version + ".schema.json"))
        .pipe(gulp.dest("out/"));
});


/**
 * Run all
 */
gulp.task("default", [tasks.generateSchema]);