import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RaceCreatedEvent } from "../events/race-created.event";

@Injectable()
export class RaceCreatedListener {
  @OnEvent("race.created")
  handleRaceCreatedEvent(event: RaceCreatedEvent) {
    // handle and process "RaceCreatedEvent" event
    console.log(event);
  }
}
