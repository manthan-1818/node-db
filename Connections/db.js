const mongoose = require("mongoose");
const uri =
  "mongodb+srv://manthanvaghela1818:vP4I8AlIZCvXgJXj@cluster0.g1mklq0.mongodb.net/";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
