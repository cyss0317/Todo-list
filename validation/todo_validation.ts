import { Todo } from "../routes/api/types";

const Validator = require("validator");
const validText = require("./valid-text");

interface Error {
  description?: string;
}

module.exports = function validateRegisterTodo(data: Todo) {
  let errors: Error = {};
  data.description = validText(data.description) ? data.description : "";
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
