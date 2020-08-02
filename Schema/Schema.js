const {gql} = require('apollo-server');
const Author = require('./../models/author');
const Book = require('./../models/book');
// const mongoose = require('mongoose');
// const {UserInputError} = require('apollo-server')

// var books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ];
// var authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const typeDefs = gql`
  type Book{
    id: ID!
    name: String
    genre: String
    author: Author
  }
  type Author{
    id: ID!
    name: String
    age: Int
    books: [Book]
  }
  type Query{
    books: [Book!]!
    authors: [Author!]!
    book(id: ID): Book
    author(id: ID): Author
  }
  type Mutation {
    addBook(name: String!, genre: String!, authorId: ID!): Book
    moveBook(id: ID!): Book
    updateBook(id: ID!, name: String!, genre: String!, authorId: ID!): Book
  }
`
const resolvers =  {
  Query: {
    books: () => Book.find({}),
    authors: () => Author.find({}),
    book: (parent, args, context, info) => {
      // if(mongoose.Types.ObjectId.isValid(args.id)){
      //   throw new UserInputError(`${args.id} is not a valid ID.`);
      // }
      return Book.findById(args.id)
    },
    author: (parent, args, context, info) => Author.findById(args.id)
  },
  Book:{
    author: (parent, args, context, info) => Author.findById({id: parent.authorId})
  },
  Author:{
    books: (parent, args, context, info) => Book.find({authorId: parent.id})
  },
  Mutation:{
    addBook: (parent, args, context, info) => {
      let book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId
      })
      return book.save()
    },
    moveBook: (parent, args, context, info) =>{
      return Book.remove(Book.findById(args.id));
      // const book = Book.findById(args.id);
      // console.log(book);
      
      // if(!book) return true;
      // return false;
      // return()
      ;
    },
    updateBook: (parent, args, context, info) => {
      // let book = new Book({
      //   name: args.name,
      //   genre: args.genre,
      //   authorId: args.authorId
      // })
      return Book.replaceOne({_id: args.id},{
        name: args.name,
        genre: args.genre,
        authorId: args.authorId
      })
    }
  }
}
module.exports = {
  typeDefs,
  resolvers
}