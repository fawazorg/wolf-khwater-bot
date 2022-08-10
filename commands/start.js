const { Validator, Command } = require("wolf.js");
const { api } = require("../bot");
const { startGroupAuto } = require("../khwater");

const COMMAND_TRIGGER = "command_start";
const START_AUTO = "message_start";
const START_AUTO_ERROR = "message_start_error";
Start = async (api, command) => {
  if (!Validator.isValidNumber(command.argument)) {
    return await api
      .messaging()
      .sendMessage(
        command,
        api
          .phrase()
          .getByLanguageAndName(
            command.language,
            "error_duration_must_be_number"
          )
      );
  }
  let duration = parseInt(command.argument);
  if (!(duration >= 5 && duration <= 90)) {
    return await api
      .messaging()
      .sendMessage(
        command,
        api
          .phrase()
          .getByLanguageAndName(
            command.language,
            "error_duration_between_5_and_90"
          )
      );
  }
  let res = await startGroupAuto(command.targetGroupId, duration);
  if (!res) {
    return await api
      .messaging()
      .sendMessage(
        command,
        api.phrase().getByLanguageAndName(command.language, START_AUTO_ERROR)
      );
  }

  let phrase = api
    .phrase()
    .getByLanguageAndName(command.language, "message_start");
  let text = api.utility().string().replace(phrase, { duration });
  await api.messaging().sendMessage(command, text);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Start(api, command),
});
