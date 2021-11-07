import { Exclude } from "class-transformer";
import { PasswordTransformer } from "./password.transformer";
import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity({
  name: "users",
})
export class User {
  @ObjectIdColumn()
  id!: number;

  @Column({ length: 255 })
  firstName!: string;

  @Column({ length: 255 })
  lastName!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({
    name: "password",
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password!: string;
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
