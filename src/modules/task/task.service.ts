import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval, Timeout } from "@nestjs/schedule";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron("0 */1 * * * *")
  handleCron() {
    this.logger.debug("Called every minute");
  }
}
