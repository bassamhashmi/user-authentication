const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  const dbInfo = mongoose.connection;

  console.log(`Database started with host ${dbInfo.host} `);
  dbInfo.on("error", (error) => console.error(error));
};

module.exports = connectDatabase;
