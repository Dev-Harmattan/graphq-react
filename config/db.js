const mongoose = require('mongoose');

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  console.log(
    `Database connected on port ${conn.connection.port}`.cyan.underline.bold
  );
};

module.exports = connectDb;
