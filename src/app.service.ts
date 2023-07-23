import { OnInit } from '@core/hooks';
import { runMigrations } from '@infra/typeorm/migrations';
import { Logger } from '@nestjs/common';
export class AppService implements OnInit {
  private logger = new Logger(AppService.name);
  async onInit() {
    /**
     * Initialize a bunch stuff here
     */
    this.logger.log('App core init');
    //run migration
    await runMigrations();
  }
}
