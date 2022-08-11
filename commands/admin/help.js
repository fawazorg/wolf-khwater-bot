const { Command } = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_help";
const COMMAND_RESPONSE = "message_admin_help";

AdminHelp = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  await api
    .messaging()
    .sendMessage(
      command,
      api
        .phrase()
        .getByLanguageAndName(command.language, COMMAND_RESPONSE)
        .join("\n")
    );
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => AdminHelp(api, command),
});
