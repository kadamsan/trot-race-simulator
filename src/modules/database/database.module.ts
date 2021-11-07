import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { Race } from "../race/race.entity";
import { User } from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.databaseType,
          host: config.databaseHost,
          port: config.databasePort,
          database: config.databaseName,
          username: config.databaseUsername,
          password: config.databasePassword,
          // importing entities directly because Webpack + glob path pattern + ts file = crash
          // https://github.com/nestjs/nest/issues/711
          entities: [User, Race], //entities: ["src/modules/**/*.entity{.ts,.js}"],
          migrations: [User, Race], //migration: ["src/modules/**/*.migration{.ts,.js}"],
          synchronize: config.isDev,
          logging: !config.isProd,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as TypeOrmModuleOptions),
    }),
  ],
})
export class DatabaseModule {}
