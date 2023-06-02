export const justLetters = (value) => {
  let regex = new RegExp(/^[a-zA-Z\s]*$/);
  return regex.test(value);
};

export const justNumbers = (value) => {
  let regex = new RegExp(/^[0-9]+$/);
  return regex.test(value);
};

export const isEmail = (value) => {
  let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return regex.test(value);
};

export const isPhoneNumber = (value) => {
  let regex = new RegExp(/^[0-9]{10}$/);
  return regex.test(value);
};

export const isYear = (value) => {
  let regex = new RegExp(/^[0-9]{4}$/);
  return regex.test(value);
};
