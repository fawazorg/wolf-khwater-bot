const { Command, Validator } = require("wolf.js");
const { deleteKhwater } = require("../../khwater");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_admin_delete";
const DELETE_SUCCESS = "message_delete_success";
const DELETE_FAIL = "message_delete_fail";
const DELETE_ERROR = "error_kid_must_be_number";

Delete = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  if (!Validator.isValidNumber(command.argument)) {
    return await sendMessage(api, command, DELETE_ERROR);
  }
  let id = api.utility().number().toEnglishNumbers(command.argument);
  let khwater = await deleteKhwater(id);
  if (khwater) {
    return await sendMessage(api, command, DELETE_SUCCESS);
  }
  return await sendMessage(api, command, DELETE_FAIL);
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
  both: (command) => Delete(api, command),
});
