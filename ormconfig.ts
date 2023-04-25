import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "P4ssw0rd!",
    "database": "postgres",
    "entities": ["**/*.entity{.ts,.js}"],
    "migrations": ["src/migration/*.ts"]
})
