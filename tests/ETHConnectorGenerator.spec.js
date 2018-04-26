'use strict';
const utils = require(__dirname+"utils");
const fs = require("fs");
const assert = require('chai').assert;

let schema = [
    {
        className: "ETHConnectorGenerator",
        classPath: __dirname+"/../ETHConnectorGenerator",
        call_instance(cls){
            let generator = new cls(__dirname+"/tests/samples/test_config.json");
            generator.init();
            generator.process();
            return generator;
        },
        verify: function(instance){
            it(`Generated ETH connector controller output class matches the sample output file contents`, () => {
                assert.equal(
                    instance.controller_class_code,
                    fs.readFileSync(__dirname+"/tests/samples/eth_connector/Controller.js"),
                );
            });
        },
    }
];

utils.test(schema);