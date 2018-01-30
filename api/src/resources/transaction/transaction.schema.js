const Validator = require('jsonschema').Validator;

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    type: { type: 'string' },
    value: { type: 'string' },
    createdOn: { type: 'Date' },
  },
  required: ['value'],
};

module.exports = obj => validator.validate(obj, userSchema);
