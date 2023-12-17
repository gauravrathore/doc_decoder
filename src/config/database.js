const mongoose = require("mongoose");
const logger = require("../logger/logger");
const options = {
  useNewUrlParser: true,
};
(async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`, options);
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connection ", error);
    logger.error(error);
    process.exit(1);
  }
})();
