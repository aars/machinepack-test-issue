module.exports = {


  friendlyName: 'Test',


  description: '',


  cacheable: false,


  sync: false,


  inputs: {
    string: {
      example: 'dot.notated.key',
      required: true
    },
    object: {
      example: {'dot': {'notated': {'key': 'Value!'}}},
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
