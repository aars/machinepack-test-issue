module.exports = {


  friendlyName: 'Test',


  description: '',


  cacheable: false,


  sync: false,


  inputs: {
    string: {
      example: 'dot.notated.key',
      typeclass: '*',
      required: true
    },
    object: {
      example: {'dot': {'notated': {'key': 'Value!'}}},
      // Without this typeclass `machinepack exec` will fail which apparently
      // doesn't use validate() method. It has no effect on tests.
      typeclass: '*',
      required: true,
      validate: function () {
        // The example is used very strictly in validating input,
        // object must have deep corresponding keys. Making a useful
        // example combination for both inputs impossible without
        // a custom validate method.
        return true;
      }
    }
  },


  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits) {
    console.log("THE INPUTS:", inputs);

    return exits.success();
  },



};
