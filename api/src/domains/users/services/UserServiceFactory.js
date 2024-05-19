const { Op } = require("sequelize");

function UserServiceFactory({
  UserModel,
  buildUser,
  NotAuthorizedError,
  PermissionError,
  QueryError,
}) {
  return class UserService {
    async create(body) {
      const user = await UserModel.findOne({ where: { email: body.email } });
      if (user) {
        throw new QueryError("E-mail já cadastrado!");
      } else {
        const user = buildUser({
          name: body.name,
          email: body.email,
          password: body.password,
        });

        await UserModel.create(user);
      }
    }

    async getAll(userId) {
      const users = await UserModel.findAll({
        attributes: ["id", "name", "email"],
        where: {
          id: {
            [Op.not]: userId,
          },
        },
      });

      if (!users) {
        throw new QueryError("Nenhum usuário retornado!");
      } else {
        return users;
      }
    }

    async getById(id) {
      const user = await UserModel.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      if (user) {
        return user;
      }
      throw new QueryError(`Não há um usuário com o ID ${id}!`);
    }

    async update(id, body, loggedUser) {
      const user = await this.getById(id);

      if (loggedUser.id != id) {
        throw new NotAuthorizedError(
          "Você não tem permissão para editar outro usuário!"
        );
      }

      await user.update(body);
    }

    async delete(id, idReqUser) {
      if (idReqUser == id) {
        throw new PermissionError("Não é possível deletar o próprio usuário!");
      } else {
        const user = await this.getById(id);
        await user.destroy();
      }
    }
  };
}

module.exports = UserServiceFactory;
