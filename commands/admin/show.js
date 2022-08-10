const { Command, Validator } = require("wolf.js");
const { showKhwater } = require("../../khwater");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_admin_show";
const SHOW_FAIL = "message_show_fail";
const SHOW_ERROR = "error_kid_must_be_number";

AdminShow = async (api, command) => {
  if (!Validator.isValidNumber(command.argument)) {
    return await sendMessage(api, command, SHOW_ERROR);
  }
  let id = api.utility().number().toEnglishNumbers(command.argument);
  let khwater = await showKhwater(id);
  if (khwater) {
    return await api.messaging().sendMessage(command, khwater.text);
  }
  return await sendMessage(api, command, SHOW_FAIL);
};

const sendMessage = async (api, command, phrase) => {
  await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, phrase)
    );
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => AdminShow(api, command),
});
