export function notNullValidator(entry, setError) {
  if (!entry) {
    setError("Este campo é obrigatório!");
  } else {
    setError(null);
    return entry;
  }
}

export function usernameValidator(username, setError) {
  if (!username) {
    setError("Este campo é obrigatório!");
  } else if (username.length < 4) {
    setError("Nome de usuário deve ter no mínimo 4 caracteres!");
  } else if (username.length > 16) {
    setError("Nome de usuário deve ter no máximo 16 caracteres!");
  } else {
    setError(null);
    return username;
  }
}

export function passwordValidator(password, setError) {
  if (!password) {
    setError("Este campo é obrigatório!");
  } else if (password.length < 8) {
    setError("Senha deve ter no mínimo 8 caracteres!");
  } else {
    setError(null);
    return password;
  }
}

export function checkPasswordValidator(checkPassword, password, setError) {
  if (!checkPassword) {
    setError("Este campo é obrigatório!");
  } else if (password !== checkPassword) {
    setError("Senhas incompatíveis!");
  } else {
    setError(null);
    return checkPassword;
  }
}

export function nameValidator(name, setError) {
  if (!name) {
    setError("Este campo é obrigatório!");
  } else if (name.length > 100) {
    setError("Nome deve ter no máximo 100 caracteres!");
  } else {
    setError(null);
    return name;
  }
}

export function emailValidator(email, setError) {
  if (!email) {
    setError("Este campo é obrigatório!");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Email inválido!");
  } else {
    setError(null);
    return email;
  }
}
