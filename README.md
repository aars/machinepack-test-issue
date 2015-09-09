### machinepack exec oddity
`mp exec test --string='"some.key"' --object='{"some": {"key": "Value!"}}'`

Without `typeclass: '*'` on `inputs.object` `mp exec` results in errors. Apparently the custom `validate()` method
is not used here.

```
[machinepack-inputsexampletest] mp exec test --string='"some.key"' --object='{"some": {"key": "Value!"}}'

Running machine...

Consistency violation in run-machine-interactive: could not parse machine input value (object).
Error details:
 { [Error: 3 errors validating value:
 • For key `dot`: Expecting { notated: { key: 'string' } } (but got `undefined`)
 • For key `dot.notated`: Expecting { key: 'string' } (but got `undefined`)
 • For key `dot.notated.key`: Expecting 'string' (but got `undefined`)]
  code: 'E_INVALID',
  errors:
   [ { [Error: For key `dot`: Expecting { notated: { key: 'string' } } (but got `undefined`)]
       keyName: 'dot',
       actual: undefined,
       expected: [Object],
       code: 'E_NOT_STRICTLY_VALID' },
     { [Error: For key `dot.notated`: Expecting { key: 'string' } (but got `undefined`)]
       keyName: 'dot.notated',
       actual: undefined,
       expected: [Object],
       code: 'E_NOT_STRICTLY_VALID' },
     { [Error: For key `dot.notated.key`: Expecting 'string' (but got `undefined`)]
       keyName: 'dot.notated.key',
       actual: undefined,
       expected: 'string',
       code: 'E_NOT_STRICTLY_VALID' } ] }
Unexpected error occurred:
 Error: `run-machine` machine encountered 1 error(s) while validating runtime input values:  Error: 1 error validating value:
 • For key `value`: Expecting 'ref' (but got `undefined`)
    at consolidateErrors (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/rttc/lib/helpers/consolidate-errors.js:45:13)
    at Object.validate (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/rttc/lib/validate.js:33:13)
    at /Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/validate-configured-input-values.js:226:34
    at /Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/lodash/index.js:3073:15
    at baseForOwn (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/lodash/index.js:2046:14)
    at /Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/lodash/index.js:3043:18
    at Function.<anonymous> (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/node_modules/lodash/index.js:3346:13)
    at validateConfiguredInputValues (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/validate-configured-input-values.js:31:5)
    at Machine_prototype_exec [as exec] (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/Machine.prototype.exec.js:45:29)
    at Object.Machine.build.exec.success (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machinepack-localmachinepacks/machines/run-machine-interactive.js:206:12)
    at /Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/Machine.prototype.exec.js:58:21
    at Machine_prototype_exec [as exec] (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/Machine.prototype.exec.js:66:11)
    at Object.Machine.build.exec.success (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machinepack-localmachinepacks/machines/run-machine-interactive.js:206:12)
    at afterwards (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/intercept-exit-callbacks.js:160:21)
    at null._onTimeout (/Users/aaronh/.nvm/versions/node/v0.12.7/lib/node_modules/machinepack/node_modules/machine/lib/intercept-exit-callbacks.js:111:20)
    at Timer.listOnTimeout (timers.js:119:15)
```

### test-machinepack-mocha oddity

When running tests using `test-machinepack-mocha` (the default `npm test` setup) the given `object` input does
not reach the `fn`. Somehow the first level of the `example` objects is passed in.

```
[machinepack-inputsexampletest] npm test                                                     master  ✭

> machinepack-inputsexampletest@0.1.0 test /Users/aaronh/dev/rxs/machinepack-inputsexampletest
> node ./node_modules/test-machinepack-mocha/bin/testmachinepack-mocha.js



  `test` machine
THE INPUTS: { string: 'some.key', object: { dot: undefined } }
    ✓ should exit with `success` given input values: `{"string":"some.key","object":{"some":{"key":"Value!"}}}` (47ms)


  1 passing (56ms)
```

As you can see, `console.log(inputs)` does not contain what the test says it passed in.
