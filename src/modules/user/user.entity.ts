import { Exclude } from "class-transformer";
import { PasswordTransformer } from "./password.transformer";
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
} from "typeorm";
import { createHmac } from "crypto";

@Entity({
  name: "users",
})
export class User {
  @ObjectIdColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await Promise.resolve(
      createHmac("sha256", this.password).digest("hex")
    );
  }
}

export class UserFillableFields {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
}
