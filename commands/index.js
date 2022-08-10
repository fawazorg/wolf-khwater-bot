const Default = require("./default");
const Help = require("./help");
const Start = require("./start");
const Stop = require("./stop");
const Admin = require("./admin/index");
const Last = require("./last");
const Commands = [Start, Stop, Last, Help, Admin];

Default.children = Commands;

module.exports = Default;
