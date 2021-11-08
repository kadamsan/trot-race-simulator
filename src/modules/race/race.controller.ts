import { Body, Controller, Post } from "@nestjs/common";
import { RaceService } from "./race.service";

@Controller("race")
export class RaceController {
  constructor(private raceService: RaceService) {}

  // @Post()
  // create(@Body() createRaceDto: RaceFillableFields) {
  //   return this.raceService.create(createRaceDto);
  // }
}
