"use strict";

// Imports
const Lab = require("lab");
const Code = require("code");
const Sinon = require("sinon");
const Sut = require("../src/server");


// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const beforeEach = lab.beforeEach;
const it = lab.it;
const expect = Code.expect;


// Tests
describe("server", () => {

    let fs;
    let teamcityServiceMessages;

    beforeEach((done) => {

        fs = {
            readFile: Sinon.stub()
        };

        teamcityServiceMessages = {
            setParameter: Sinon.spy(),
            buildProblem: Sinon.spy()
        };

        return done();
    });

    it("should set PACKAGE_NAME parameter", (done) => {

        // Arrange
        const packageJson = { name: "mock-package-name" };
        fs.readFile.callsArgWith(1, null, JSON.stringify(packageJson));

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(fs.readFile.calledOnce).to.be.true();
        expect(teamcityServiceMessages.setParameter.calledOnce).to.be.true();
        expect(teamcityServiceMessages.setParameter.getCall(0).args).to.have.length(1);
        expect(teamcityServiceMessages.setParameter.getCall(0).args[0]).to.include({
            "name": "PACKAGE_NAME",
            "value": "mock-package-name"
        });
        return done();
    });

    it("should set PACKAGE_DESCRIPTION parameter", (done) => {

        // Arrange
        const packageJson = { description: "Mock package description" };
        fs.readFile.callsArgWith(1, null, JSON.stringify(packageJson));

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(teamcityServiceMessages.setParameter.calledOnce).to.be.true();
        expect(teamcityServiceMessages.setParameter.getCall(0).args)
            .to.have.length(1);
        expect(teamcityServiceMessages.setParameter.getCall(0).args[0])
            .to.include({
                "name": "PACKAGE_DESCRIPTION",
                "value": "Mock package description"
            });
        return done();
    });

    it("should set PACKAGE_VERSION parameter", (done) => {

        // Arrange
        const packageJson = { version: "1.0.0" };
        fs.readFile.callsArgWith(1, null, JSON.stringify(packageJson));

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(teamcityServiceMessages.setParameter.calledOnce).to.be.true();
        expect(teamcityServiceMessages.setParameter.getCall(0).args)
            .to.have.length(1);
        expect(teamcityServiceMessages.setParameter.getCall(0).args[0])
            .to.include({
                "name": "PACKAGE_VERSION",
                "value": "1.0.0"
            });
        return done();
    });

    it("should set PACKAGE_LICENSE parameter", (done) => {

        // Arrange
        const packageJson = { license: "MIT" };
        fs.readFile.callsArgWith(1, null, JSON.stringify(packageJson));

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(teamcityServiceMessages.setParameter.calledOnce).to.be.true();
        expect(teamcityServiceMessages.setParameter.getCall(0).args)
            .to.have.length(1);
        expect(teamcityServiceMessages.setParameter.getCall(0).args[0])
            .to.include({
                "name": "PACKAGE_LICENSE",
                "value": "MIT"
            });
        return done();
    });

    it("should send a `no package.json` buildProblem message if the package.json can not be found", (done) => {

        // Arrange
        const error = new Error("File not found");
        error.code = "ENOENT";
        fs.readFile.callsArgWith(1, error);

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(teamcityServiceMessages.buildProblem.calledOnce).to.be.true();
        expect(teamcityServiceMessages.buildProblem.getCall(0).args)
            .to.have.length(1);
        expect(teamcityServiceMessages.buildProblem.getCall(0).args[0])
            .to.include({
                "description": "No package.json file found in working directory."
            });
        return done();
    });

    it("should send a generic buildProblem message if fs.readFile fails for any other reason", (done) => {

        // Arrange
        const error = new Error("Some other error");
        error.code = "NOT ENOENT";
        fs.readFile.callsArgWith(1, error);

        // Act
        Sut(fs, teamcityServiceMessages);

        // Assert
        expect(teamcityServiceMessages.buildProblem.calledOnce).to.be.true();
        expect(teamcityServiceMessages.buildProblem.getCall(0).args)
            .to.have.length(1);
        expect(teamcityServiceMessages.buildProblem.getCall(0).args[0])
            .to.include({
                "description": "Could not read the package.json: " + error
            });
        return done();
    });
})
