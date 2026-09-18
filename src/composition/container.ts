import { InMemoryOrderRepository } from "@infrastructure/persistence/InMemoryOrderRepository";
import { PostgresOrderRepository } from "@infrastructure/persistence/PostgresOrderRepository";
import { HttpPricingService } from "@infra/services/HttpPricingService"
import { OutboxEventBus } from "@infra/messaging/OutboxEventBus"
import { AddItemToOrder } from "@application/use-cases/AddItemToOrder"
import { PinoLogger } from "@infra/observability/PinoLogger"
import { Pool } from "pg"

const env = process.env
const pool = new Pool({ connectionString: env.DATABASE_URL })

// Cambia aquí para in-memory o Postgres
const orders =
  env.USE_INMEMORY === "true"
    ? new InMemoryOrderRepository()
    : new PostgresOrderRepository(pool)

const pricing = new HttpPricingService(env.PRICING_BASE_URL ?? "http://localhost:4000")
const events = new OutboxEventBus(pool)
export const logger = new PinoLogger()

export const addItemToOrder = new AddItemToOrder(orders, pricing, events, { now: () => new Date() })