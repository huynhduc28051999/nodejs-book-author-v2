const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mogoose.model('Author',authorSchema)