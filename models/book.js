const mogoose = require('mongoose');
// const Schema = mogoose.Schema;

const bookSchema = new mogoose.Schema({
  name: String,
  genre: String,
  authorId: String
},{
  timestamps: true
});

module.exports =  mogoose.model('Book', bookSchema);