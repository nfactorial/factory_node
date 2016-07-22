'use strict';

var chai = require('chai');
var expect = chai.expect;
var UnitFactory = require('../index.js');

/**
 * Verify the Factory class behaves as expected.
 */
describe('factory_node', function() {
    const TEST_UNIT_NAME = 'TestUnit';
    const INVALID_UNIT_NAME = 'InvalidUnitName';

    it('Should be empty when constructed', function() {
        const factory = new UnitFactory();

        expect(factory.map.size).to.equal(0);
    });

    it('Should allow objects to be registered', function() {
        const TestUnitCtor = function() {};

        const factory = new UnitFactory();

        expect(factory.register(undefined, TestUnitCtor)).to.be.false;
        expect(factory.register(null, TestUnitCtor)).to.be.false;
        expect(factory.register('', TestUnitCtor)).to.be.false;
        expect(factory.register(TEST_UNIT_NAME, undefined)).to.be.false;
        expect(factory.register(TEST_UNIT_NAME, null)).to.be.false;

        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.true;
        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.false

        expect(factory.map.size).to.equal(1);
    });

    it('Should allow objects to be unregistered', function() {
        const TestUnitCtor = function() {};

        const factory = new UnitFactory();

        expect(factory.unregister(TEST_UNIT_NAME)).to.be.false;

        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.true;
        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.false;

        expect(factory.map.size).to.equal(1);

        expect(factory.unregister(undefined)).to.be.false;
        expect(factory.unregister(null)).to.be.false;

        expect(factory.map.size).to.equal(1);

        expect(factory.unregister(TEST_UNIT_NAME)).to.be.true;
        expect(factory.unregister(TEST_UNIT_NAME)).to.be.false;

        expect(factory.map.size).to.equal(0);

        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.true;
        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.false;

        expect(factory.map.size).to.equal(1);
    });

    it('Should create registered objects', function() {
        let counter = 0;

        const TestUnitCtor = function() { counter++; };

        const factory = new UnitFactory();

        // Ensure create fails when we haven't registered our object
        expect(factory.create(TEST_UNIT_NAME)).to.be.null;
        expect(factory.create(INVALID_UNIT_NAME)).to.be.null;

        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.true;

        // Ensure create still fails for invalid name after registration and succeeds for our object
        expect(factory.create(INVALID_UNIT_NAME)).to.be.null;
        expect(factory.create(TEST_UNIT_NAME)).to.not.be.null;

        expect(factory.unregister(TEST_UNIT_NAME)).to.be.true;

        // Ensure create fails after we have unregistered
        expect(factory.create(INVALID_UNIT_NAME)).to.be.null;
        expect(factory.create(TEST_UNIT_NAME)).to.be.null;

        // Verify our constructor was invoked the expected number of times
        expect(counter).to.equal(1);
    });

    it('Should pass on arguments to the constructor', function() {
        const TEST_STRING = 'testing';

        let counter = 0;

        const TestUnitCtor = function (a, b, c) {
            if (0 !== a) {
                throw new Error('TestUnitCtor - Expected a to equal 0 but it was ' + a);
            }

            if (1 !== b) {
                throw new Error('TestUnitCtor - Expected a to equal 0 but it was ' + a);
            }

            if (TEST_STRING !== c) {
                throw new Error('TestUnitCtor - Expected a to equal 0 but it was ' + a);
            }
            counter++;
        };

        const factory = new UnitFactory();

        expect(factory.register(TEST_UNIT_NAME, TestUnitCtor)).to.be.true;

        expect(factory.create(TEST_UNIT_NAME, 0, 1, TEST_STRING)).to.not.be.null;

        expect(factory.unregister(TEST_UNIT_NAME)).to.be.true;

        // Verify our constructor was invoked the expected number of times
        expect(counter).to.equal(1);
    });
});
