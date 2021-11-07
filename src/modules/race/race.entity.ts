import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity({
  name: "races",
})
export class Race {
  @ObjectIdColumn()
  id!: number;

  @Column()
  name!: string;
}

export class RaceFillableFields {
  name!: string;
}
