import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Cron } from "@nestjs/schedule";
import { RaceCreatedEvent } from "../race/events/race-created.event";
import { RaceEvent } from "../race/events/race.event";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  public horses: any[] = [
    {
      name: "Horse #1",
    },
    {
      name: "Horse #2",
    },
    {
      name: "Horse #3",
    },
    {
      name: "Horse #4",
    },
    {
      name: "Horse #5",
    },
    {
      name: "Horse #6",
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  @Cron("0 */1 * * * *")
  handleRaceCron() {
    this.logger.debug("Race starts every minute");

    this.eventEmitter.emit("race.created", "Horses are ready to trot");

    const startEvent = {
      event: "start",
      horses: this.horses,
      time: 0,
    };

    this.eventEmitter.emit("race.start", startEvent);
  }
}
