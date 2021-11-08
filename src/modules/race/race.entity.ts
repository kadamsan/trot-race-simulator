import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity({
  name: "races",
})
export class Race {
  @ObjectIdColumn()
  id!: number;

  @Column()
  event!: string;

  @Column((type) => horse)
  horses!: horse[];

  @Column()
  time!: number;
}

export class horse {
  @Column()
  name!: string;
}
