
const mongoose = require('mongoose');

exports.connectToMongoDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URL, {
    });
    console.log(`Connected to MongoDB:${mongo.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
