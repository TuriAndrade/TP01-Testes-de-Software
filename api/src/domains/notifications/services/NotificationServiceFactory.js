function NotificationServiceFactory({
  NotificationModel,
  ExchangeModel,
  UserService,
  ExchangeService,
  buildNotification,
}) {
  return class NotificationService {
    async create(body) {
      const newNotification = buildNotification({
        from: body.from,
        to: body.to,
      });

      const createdNotification = await NotificationModel.create(
        newNotification.toObject()
      );

      await Promise.all(
        body.offeredStickers.map((sticker) =>
          ExchangeService.create({
            userId: body.to,
            notificationId: createdNotification.id,
            stickerNumber: sticker,
          })
        )
      );

      await Promise.all(
        body.wantedStickers.map((sticker) =>
          ExchangeService.create({
            userId: body.from,
            notificationId: createdNotification.id,
            stickerNumber: sticker,
          })
        )
      );
    }

    async getAllToUser(to) {
      const notifications = await NotificationModel.findAll({
        where: {
          to,
        },
        include: {
          model: ExchangeModel,
        },
      });

      return Promise.all(
        notifications.map((notification) =>
          UserService.getById(notification.from).then((user) => {
            const wanted = notification.Exchanges.filter(
              (exchange) => exchange.userId == notification.from
            );

            const offered = notification.Exchanges.filter(
              (exchange) => exchange.userId == to
            );

            return { notification, user, offered, wanted };
          })
        )
      );
    }
  };
}

module.exports = NotificationServiceFactory;
