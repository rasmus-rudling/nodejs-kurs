import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import {and, eq, ne, not, sql} from 'drizzle-orm';
import {bikeStoresTable} from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

export type CreateStore = typeof bikeStoresTable.$inferInsert
export type UpdateStore = Partial<CreateStore>

export class BikeStoreRepository {
  async create(createStore: CreateStore): Promise<string> {
    const createdStores = await db.insert(bikeStoresTable).values(createStore).returning({insertedId: bikeStoresTable.id})
    return createdStores[0].insertedId
  }

  async findAll(): Promise<typeof bikeStoresTable.$inferSelect[]> {
    return db
      .select()
      .from(bikeStoresTable)
      .where(eq(bikeStoresTable.isDeleted, false))
  }

  async findOne(id: string): Promise<typeof bikeStoresTable.$inferSelect> {
    const storesResult =
      await db
        .select()
        .from(bikeStoresTable)
        .where(
          and(
            eq(bikeStoresTable.id, id),
            eq(bikeStoresTable.isDeleted, false)
          )
        )

    if (storesResult.length === 0) {
      throw new Error(`Couldn't find store with id ${id}`)
    }

    return storesResult[0]
  }

  async update(id: string, updateStore: UpdateStore): Promise<string> {
    const updatedStores =
      await db
        .update(bikeStoresTable)
        .set(updateStore)
        .where(eq(bikeStoresTable.id, id))
        .returning({updatedId: bikeStoresTable.id})

    if (updatedStores.length === 0) {
      throw new Error(`Could not find store with id ${id}`)
    }

    return updatedStores[0].updatedId
  }

  async delete(id: string): Promise<string> {
    const deletedStores =
      await db
        .update(bikeStoresTable)
        .set({ isDeleted: true })
        .where(eq(bikeStoresTable.id, id))
        .returning({updatedId: bikeStoresTable.id})

    if (deletedStores.length === 0) {
      throw new Error(`Could not find store with id ${id}`)
    }

    return deletedStores[0].updatedId
  }
}
