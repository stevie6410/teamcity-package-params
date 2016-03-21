#!/usr/bin/env node

"use strict";
const fs = require("fs");
const tsm = require("teamcity-service-messages");

function outputPackageParameters() {
  fs.readFile("./package.json", (err, data) => {
    if (err) {
      console.error("Could not read the package.json", err);
    }

    const packageJson = JSON.parse(data);

    if (packageJson.name) {
      tsm.setParameter({"name": "PACKAGE_NAME", "value": packageJson.name});
    }

    if (packageJson.description) {
      tsm.setParameter({"name": "PACKAGE_DESCRIPTION", "value": packageJson.description});
    }

    if (packageJson.version) {
      tsm.setParameter({"name": "PACKAGE_VERSION", "value": packageJson.version});
    }

    if (packageJson.license) {
      tsm.setParameter({"name": "PACKAGE_LICENSE", "value": packageJson.license});
    }
  });
}

fs.access("./package.json", fs.F_OK | fs.R_OK, (err) => {
  if (err) {
    tsm.buildProblem({"description": "No package.json file found in working directory."});
    process.exit(1);
  } else {
    outputPackageParameters();
  }
});
