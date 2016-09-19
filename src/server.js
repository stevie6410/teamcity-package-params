"use strict";


exports = module.exports = function outputPackageParameters(fs, teamcityServiceMessages) {

    fs.readFile("./package.json", (err, data) => {

        if (err) {

            if (err.code === "ENOENT") {
                teamcityServiceMessages.buildProblem({"description": "No package.json file found in working directory."});

                return;
            }

            teamcityServiceMessages.buildProblem({"description": "Could not read the package.json: " + err});

            return;
        }

        const packageJson = JSON.parse(data);

        if (packageJson.name) {
            teamcityServiceMessages.setParameter({"name": "PACKAGE_NAME", "value": packageJson.name});
        }

        if (packageJson.description) {
            teamcityServiceMessages.setParameter({"name": "PACKAGE_DESCRIPTION", "value": packageJson.description});
        }

        if (packageJson.version) {
            teamcityServiceMessages.setParameter({"name": "PACKAGE_VERSION", "value": packageJson.version});
        }

        if (packageJson.license) {
            teamcityServiceMessages.setParameter({"name": "PACKAGE_LICENSE", "value": packageJson.license});
        }
    });
}
