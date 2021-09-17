const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("The database have been Connected"))
  .catch((err: any) => console.log(`DB Connection Error${err}`));

mongoose.connection.on("error", (err: any) => {
  console.log(`DB connection error: ${err.message}`);
});

module.exports = mongoose;
