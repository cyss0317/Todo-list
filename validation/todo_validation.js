const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterTodo(data) {
  let errors = {};
  data.description = validText(data.description) ? data.description : "";
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
