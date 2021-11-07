import { Body, Controller, Post } from "@nestjs/common";
import { RaceService } from "./race.service";
import { RaceFillableFields, Race } from "./race.entity";

@Controller("race")
export class RaceController {
  constructor(private raceService: RaceService) {}

  @Post()
  create(@Body() createRaceDto: RaceFillableFields) {
    return this.raceService.create(createRaceDto);
  }
}
