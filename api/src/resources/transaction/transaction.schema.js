const Validator = require('jsonschema').Validator;

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    person: { type: 'string' },
    amount: { type: 'string' },
    createdOn: { type: 'Date' },
  },
  required: ['amount'],
};

module.exports = obj => validator.validate(obj, userSchema);
