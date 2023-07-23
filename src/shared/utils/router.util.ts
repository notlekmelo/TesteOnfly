import { INestApplication } from '@nestjs/common';
export class RouterUtil {
  static getRoutes(app: INestApplication) {
    const server = app.getHttpServer();
    const router = server._events.request._router;

    const availableRoutes: [] = router.stack
      .map((layer) => {
        if (layer.route) {
          return {
            route: {
              path: layer.route?.path,
              method: layer.route?.stack[0].method,
            },
          };
        }
      })
      .filter((item: any) => item !== undefined);
    return availableRoutes;
  }
}
