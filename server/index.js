const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const cors = require('cors');

const connectDb = require('../config/db');
const schema = require('../schema/schema');
require('dotenv').config();

const port = process.env.PORT || 5000;

//mongodb connection
connectDb();

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
