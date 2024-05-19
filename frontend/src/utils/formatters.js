export function nameFormatter(name) {
  return (
    (/^[a-zA-Z ,.'-]+$/.test(name) && name.length <= 100) || name.length === 0
  );
}

export function usernameFormatter(username) {
  return (
    (/^[a-z0-9_.]+$/.test(username) && username.length <= 16) ||
    username.length === 0
  );
}

export function emailFormatter(email) {
  return email.length <= 300; //longest email possible's length is something around 256 characters
}

export function passwordFormatter(password) {
  return password.length <= 100;
}
