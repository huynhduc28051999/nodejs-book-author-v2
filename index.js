const {ApolloServer,gql} = require('apollo-server');
const {typeDefs,resolvers} = require('./Schema/Schema');
const mongoose = require('mongoose');

const server = new ApolloServer({typeDefs,resolvers});

(async () =>{
  try{
    await mongoose.connect('mongodb+srv://duc:duc1234a@cluster0-pvxto.mongodb.net/author-book?retryWrites=true&w=majority')
    mongoose.connection.once('open',() =>{
      console.log('connected to database');
      
    });
    server.listen().then(({url}) => {
      console.log(`Sever ready ar ${url}`)
    })
  }catch(e){
    console.error(e);
  }
  
})()
  // mongoose.connect('mongodb+srv://duc:duc1234a@cluster0-pvxto.mongodb.net/author-book?retryWrites=true&w=majority')
  // mongoose.connection.once('open',() =>{
  //   console.log('connected to database');
    
  // });
  // server.listen().then(({url}) => {
  //   console.log(`Sever ready ar ${url}`)
  // })