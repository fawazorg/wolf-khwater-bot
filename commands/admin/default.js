const { Command } = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_admin_default";
const COMMAND_RESPONSE = "message_admin_default";

AdminDefault = async (api, command) => {
  await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, COMMAND_RESPONSE)
    );
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => AdminDefault(api, command),
});
