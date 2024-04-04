const mongoose = require("mongoose");
const demoSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const DemoModel = mongoose.model("Demo", demoSchema);

module.exports = DemoModel;
