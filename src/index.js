#!/usr/bin/env node

"use strict";

const Fs = require("fs");
const TeamcityServiceMessages = require("teamcity-service-messages");
const OutputPackageParameters = require("./server");


OutputPackageParameters(Fs, TeamcityServiceMessages);
