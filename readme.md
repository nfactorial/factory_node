## Build status

| [Linux][lin-link] |
| :---------------: |
| ![lin-badge]      |

[lin-badge]: https://travis-ci.org/nfactorial/factory_node.svg?branch=master "Travis build status"
[lin-link]:  https://travis-ci.org/nfactorial/factory_node "Travis build status"

Factory
=======
Simple module for Node.js that provides a class for creating objects by name.

This module is available using npm, to install into your own project run:

```
npm install --save @nfactorial/factory_node
```

Once installed, require it as any other module with, then create
a factory with the new operator:

```
const Factory = require('@nfactorial/factory_node');

const myFactory = new Factory();
```

To use the factory, you must register your objects with your created
factory instance.

```
const Factory = require('@nfactorial/factory_node');

const myFactory = new Factory();

myFactory.register('object_name', MyClass);

const classInstance = myFactory.create('object_name');
```
