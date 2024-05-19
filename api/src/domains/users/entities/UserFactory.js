function UserFactory({ InvalidParamError }) {
  return class UserEntity {
    constructor({ name, email, password }) {
      if (!name) {
        throw new InvalidParamError("Nome inválido.");
      } else if (!email) {
        throw new InvalidParamError("Email inválido.");
      } else if (!password) {
        throw new InvalidParamError("Senha inválida.");
      } else if (typeof password != "string" || password.length < 8) {
        throw new InvalidParamError("Senha deve ter no mínimo 8 caracteres.");
      }

      this.name = name;
      this.email = email;
      this.password = password;
    }

    toObject() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
      };
    }
  };
}

module.exports = UserFactory;
