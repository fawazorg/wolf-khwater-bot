const Add = require("./add");
const Delete = require("./delete");
const Help = require("./help");
const Show = require("./show");
const Join = require("./join");
const Default = require("./default");
const Commands = [Add, Delete, Show, Join, Help];

Default.children = Commands;

module.exports = Default;
