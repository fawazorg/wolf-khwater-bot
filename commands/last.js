const { Command } = require("wolf.js");
const { api } = require("../bot");
const { getLast } = require("../khwater");

const COMMAND_TRIGGER = "command_last";

Last = async (api, command) => {
  let last = await getLast(command.targetGroupId);
  if (!last) {
    return await api
      .messaging()
      .sendMessage(
        command,
        api
          .phrase()
          .getByLanguageAndName(command.language, "message_last_error")
      );
  }

  let phrase = api
    .phrase()
    .getByLanguageAndName(command.language, "message_last");
  let text = api
    .utility()
    .string()
    .replace(phrase, { list: last.join("\n") });
  await api.messaging().sendMessage(command, text);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Last(api, command),
});
