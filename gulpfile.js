"use strict";

// Imports
const Gulp = require("gulp");
const Lab = require("gulp-lab");


// Tasks
Gulp.task("test", () => {

    return Gulp.src("test")
        .pipe(Lab("-c -a code"));
})

Gulp.task("default", ["test"]);
