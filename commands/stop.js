const { Command } = require("wolf.js");
const { api } = require("../bot");
const { stopAuto } = require("../khwater");

const COMMAND_TRIGGER = "command_stop";

Stop = async (api, command) => {
  let res = await stopAuto(command.targetGroupId);
  if (!res) {
    return await api
      .messaging()
      .sendMessage(
        command,
        api
          .phrase()
          .getByLanguageAndName(command.language, "message_stop_error")
      );
  }
  return await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, "message_stop")
    );
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Stop(api, command),
});
