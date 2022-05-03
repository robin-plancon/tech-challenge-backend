const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: "String", required:true, minlength:1}
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);