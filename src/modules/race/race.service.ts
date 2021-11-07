import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Race, RaceFillableFields } from "./race.entity";

@Injectable()
export class RaceService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Race) private readonly raceRepository: Repository<Race>
  ) {}

  async get(id: number) {
    return this.raceRepository.findOne(id);
  }

  async create(createRaceDto: RaceFillableFields) {
    const race = this.raceRepository.create(createRaceDto);
    return await this.raceRepository.save(race);
  }
}
