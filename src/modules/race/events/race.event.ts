import { RaceFillableFields } from "../race.entity";

export class RaceEvent {
  event!: string;
  horses!: RaceFillableFields[];
  time!: number;
}
