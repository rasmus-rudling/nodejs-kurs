import {boolean, date, integer, pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const bikeStoresTable = pgTable("bike_stores", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).unique().notNull(),
  isDeleted: boolean().default(false),
})

export const mechanicsTable = pgTable("mechanics", {
  id: uuid().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  yearsOfExperience: integer().notNull(),
  storeId: uuid().references(() => bikeStoresTable.id)
});
