function StickerServiceFactory({
  StickerModel,
  buildSticker,
  QueryError,
  InvalidParamError,
}) {
  return class StickerService {
    async create(body) {
      const newSticker = buildSticker({
        number: body.number,
        name: body.name,
        team: body.team,
      });

      await StickerModel.create(newSticker.toObject());
    }

    async createAll(n) {
      if (n < 1) {
        throw new InvalidParamError(
          "Número de figurinhas deve ser no mínimo 1."
        );
      }

      for (i = 1; i <= n; i++) {
        const newSticker = buildSticker({
          number: i,
        });

        await StickerModel.create(newSticker.toObject());
      }
    }

    async getAll() {
      const stickers = await StickerModel.findAll();

      if (!stickers) {
        throw new QueryError("Não há nenhuma figurinha cadastrada!");
      }

      return stickers;
    }

    async getById(id) {
      const sticker = await StickerModel.findByPk(id);

      if (!sticker) {
        throw new QueryError(`Não há uma figurinha com o ID ${id}!`);
      }

      return sticker;
    }

    async getByNumber(number) {
      const sticker = await StickerModel.findOne({ where: { number } });

      return sticker;
    }

    async update(id, body) {
      const sticker = await this.getById(id);
      await sticker.update(body);
    }

    async delete(id) {
      const sticker = await this.getById(id);
      await sticker.destroy();
    }
  };
}

module.exports = StickerServiceFactory;
