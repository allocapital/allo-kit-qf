import { onchainTable, relations } from "ponder";

export const strategy = onchainTable("strategy", (t) => ({
  chainId: t.integer().notNull(),
  address: t.hex().primaryKey(),
  creator: t.hex().notNull(),
  name: t.text(),
  schema: t.text(),
  createdAt: t.bigint().notNull(),
  updatedAt: t.bigint().notNull(),
}));

export const pool = onchainTable("pool", (t) => ({
  chainId: t.integer().notNull(),
  address: t.hex().primaryKey(),
  owner: t.hex().notNull(),
  name: t.text(),
  schema: t.text(),
  data: t.hex(),
  strategy: t.hex().notNull(),
  decodedData: t.json(),
  metadataURI: t.text(),
  metadata: t.json(),
  createdAt: t.bigint().notNull(),
  updatedAt: t.bigint().notNull(),
}));

export const registration = onchainTable("registration", (t) => ({
  id: t.hex().primaryKey(),
  chainId: t.integer().notNull(),
  address: t.hex().notNull(),
  index: t.integer().notNull(),
  strategy: t.hex().notNull(),
  data: t.hex().notNull(),
  metadataURI: t.text().notNull(),
  metadata: t.json(),
  review: t.json(),
  isApproved: t.boolean().notNull(),
  createdAt: t.bigint().notNull(),
  updatedAt: t.bigint().notNull(),
}));

export const allocation = onchainTable("allocation", (t) => ({
  id: t.text().primaryKey(),
  chainId: t.integer().notNull(),
  strategy: t.hex().notNull(),
  to: t.hex().notNull(),
  from: t.hex().notNull(),
  amount: t.bigint().notNull(),
  amountInUSD: t.bigint().notNull(),
  tokenAddress: t.hex().notNull(),
  token: t.json(),
  createdAt: t.bigint().notNull(),
}));

export const registrationRelations = relations(
  registration,
  ({ one, many }) => ({
    strategy: one(strategy, {
      fields: [registration.strategy],
      references: [strategy.address],
    }),
    allocations: many(allocation),
  })
);

export const poolRelations = relations(pool, ({ one, many }) => ({
  strategy: one(strategy, {
    fields: [pool.strategy],
    references: [strategy.address],
  }),
}));

export const allocationRelations = relations(allocation, ({ one }) => ({
  registration: one(registration, {
    fields: [allocation.to],
    references: [registration.address],
  }),
  strategy: one(strategy, {
    fields: [allocation.strategy],
    references: [strategy.address],
  }),
}));

export const strategyRelations = relations(strategy, ({ one, many }) => ({
  allocations: many(allocation),
  registrations: many(registration),
}));
