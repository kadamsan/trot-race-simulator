import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RaceCreatedEvent } from "../events/race-created.event";
import { RaceEvent } from "../events/race.event";

@Injectable()
export class RaceCreatedListener {
  @OnEvent("race.created")
  handleRaceCreatedEvent(event: RaceCreatedEvent) {
    // handle and process "RaceCreatedEvent" event
    console.log(event);
  }

  @OnEvent("race.start")
  handleRaceStartEvent(event: RaceEvent) {
    // handle and process "RaceEvent" event
    console.log(event);
  }

  @OnEvent("race.finish")
  handleRaceFinishEvent(event: RaceEvent) {
    // handle and process "RaceEvent" event
    console.log(event);
  }
}
