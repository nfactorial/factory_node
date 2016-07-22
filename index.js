'use strict';

/**
 * This class provides a means of creating object based on an associated name.
 */
class Factory {
    constructor() {
        this.map = new Map();
    }

    /**
     * Registers a new object with the factory.
     * @param name {String} Name to be associated with the object.
     * @param ctor {Function} The constructor function for the object being registered.
     * @returns {boolean} True if the object was registered successfully otherwise false.
     */
    register(name, ctor) {
        if (name && ctor) {
            if ( !this.map.has(name) ) {
                this.map.set(name, ctor);
                return true;
            }
        }

        return false;
    }

    /**
     * Removes a previously registered object from the factory.
     * @param name {String} Name of the object to be removed from the factory.
     * @returns {boolean} True if the object was removed successfully otherwise false.
     */
    unregister(name) {
        if (this.map.has(name)) {
            this.map.delete(name);
            return true;
        }

        return false;
    }

    /**
     * Creates an object of the specified type.
     * @param {String} name - Name of the object to be created.
     * @param {...*} args - Arguments to be supplied to object constructor.
     * @returns {Object} The newly created object, if the object could not be found this method returns null.
     */
    create(name, ...args) {
        if (this.map.has(name)) {
            const ctor = this.map.get(name);
            return new ctor(...args);
        }

        return null;
    }
}

module.exports = Factory;
