/**
 * Validate email
 * @param value string
 * @returns boolean true / false
 */
export const ValidateEmail = (value: string) => {
  const validator = new RegExp(/\S+@\S+\.\S+/);
  if (value !== undefined) {
    return validator.test(value);
  } else {
    return false;
  }
};

/**
 * Validate password to have at least one upper / lower charachter, one number and special symbol.
 * @param value string
 * @returns boolean true / false
 */
const ValidatePassword = (value: string) => {
  const validator = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/);
  if (value !== undefined) {
    return validator.test(value);
  } else {
    return false;
  }
};

/**
 * Validate URL format.
 * @param value string
 * @returns boolean true / false
 */
const ValidateUrl = (value: string) => {
  const validator = new RegExp(
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  if (value !== undefined) {
    return validator.test(value);
  } else {
    return false;
  }
};

/**
 * Validate code to have max 6 charachters
 * @param value string
 * @returns boolean true / false
 */
const ValidateCode = (value: string) => {
  const validator = new RegExp(/^[0-9]{1,6}$/);
  if (value !== undefined) {
    return validator.test(value);
  } else {
    return false;
  }
};

/**
 *
 * @param value string
 * @returns string error
 */
export const EmailValidation = (value: string) => {
  return (value ? undefined : 'The email is required to continue the process.') || (ValidateEmail(value) ? undefined : 'Your email is not in the correct format.');
};

/**
 * Check if the password has the right form
 * @param value string
 * @returns string error
 */
export const PasswordValidation = (value: string) => {
  return (
    (value ? undefined : 'The password is required.') ||
    (ValidatePassword(value) ? undefined : 'You should insert a password with minimum 6 charachters, at least one upper & lower case letter and at least one number.')
  );
};

/**
 * Check if two passwords are the same
 * @param firstPassword string
 * @param confirmationPassword string
 * @returns string error
 */
export const ConfirmPasswordValidation = (firstPassword: string, confirmationPassword: string) =>
  (confirmationPassword ? undefined : 'The confirm password is required.') || firstPassword === confirmationPassword ? undefined : "The passwords doesn't match!";

/**
 * Custom validation for strings
 * @param value string
 * @param required string
 * @param min number
 * @param max number
 * @returns string error
 */
export const CustomValidation = (value: string | undefined, required: string, min?: number, max?: number) => {
  if (min && max) {
    return value && value.length >= min && value.length <= max ? undefined : `${required} is not in range of ${min} and ${max} characters.`;
  } else if (min) {
    return value && value.length >= min ? undefined : `${required} doesn't have at least ${min} charachters.`;
  } else if (max) {
    return value && value.length <= max ? undefined : `${required} has more over ${max} max charachters.`;
  } else {
    return value ? undefined : `${required} is required.`;
  }
};

/**
 * Custom validation for booleans
 * @param value boolean
 * @param message string
 * @returns string error
 */
export const CustomBooleanValidation = (value: boolean, message: string) => (value ? undefined : message);

/**
 * Custom validation for numbers
 * @param value string
 * @param required string
 * @returns string error
 */
export const CustomValidationNumber = (value: string, required: string) =>
  (typeof value === 'number' ? undefined : `${required} have to be an number.`) || (value.length > 0 ? undefined : `${required} is required.`);

/**
 * Custom validation for two values, comparing if they are the same
 * @param a string
 * @param b string
 * @param reqA string
 * @param reqB string
 * @returns string error
 */
export const CustomTwoValuesValidation = (a: string, b: string, reqA: string, reqB: string) => {
  return a && b && a.localeCompare(b) === 0 ? undefined : `${reqA} is not like ${reqB}, please review the inputs.`;
};

/**
 * Custom validation for files
 * @param value File
 * @returns string error
 */
export const CustomFileValidation = (value: File, required: string) => (value ? undefined : `${required} is required.`);

/**
 * Validate a code in range of 6 charachters
 * @param value string
 * @returns string error
 */
export const CodeValidation = (value: string) => {
  return (value ? undefined : 'The code is required.') || (ValidateCode(value) ? undefined : 'Your code is not in the correct format.');
};

export const UrlValidation = (value: string | undefined) => (value ? (ValidateUrl(value) ? undefined : 'Your URL is not in the correct format.') : 'The URL is required.');