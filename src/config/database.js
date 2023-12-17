const mongoose = require("mongoose");
const logger = require("../logger/logger");
const options = {
  useNewUrlParser: true,
  autoIndex: false,
  connectTimeoutMS: 100,
  socketTimeoutMS: 100,
};
(async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`, options);
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    logger.error(error);
    process.exit(1);
  }
})();
