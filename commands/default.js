const { Command } = require("wolf.js");
const { api } = require("../bot");
const { sendRandomKhwaterToGroup } = require("../khwater");

const COMMAND_TRIGGER = "command_default";

Default = async (api, command) => {
  let k = await sendRandomKhwaterToGroup(command.targetGroupId);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Default(api, command),
});
