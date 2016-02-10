#!/usr/bin/env node

"use strict";
const fs = require("fs");
const tsm = require("teamcity-service-messages");

function outputPackageParameters() {
  const packageJson = require("./package.json");

  if (packageJson.name) {
    tsm.setParameter({"PACKAGE_NAME": packageJson.name});
  }

  if (packageJson.description) {
    tsm.setParameter({"PACKAGE_DESCRIPTION": packageJson.description});
  }

  if (packageJson.version) {
    tsm.setParameter({"PACKAGE_VERSION": packageJson.version});
  }

  if (packageJson.license) {
    tsm.setParameter({"PACKAGE_LICENSE": packageJson.license});
  }

}

fs.access("./package.json", fs.F_OK | fs.R_OK, (err) => {
  if (err) {
    tsm.buildProblem({"description": "No package.json file found in working directory."});
    process.exit(1);
  } else {
    console.log("test");
    outputPackageParameters();
  }
});
