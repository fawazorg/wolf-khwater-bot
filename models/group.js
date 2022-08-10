const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  gid: { type: Number, unique: true },
  auto: { type: Boolean, default: false },
  duration: { type: Number, default: 5 },
  lastK: { type: [Number], default: [] },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
