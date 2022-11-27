export const validateForm = (data) => {
  const { name, email } = data;

  const error = [];

  if (name.length > 20) error.push("Name khong dc dai qua 20 ki tu !");
  if (!validateEmail(email)) error.push("Email sai dinh dang !");

  return error;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
