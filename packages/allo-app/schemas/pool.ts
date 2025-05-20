import { z } from "zod";
import { Address } from "viem";
import { EthAddressSchema } from "./address";
import { MetadataSchema } from "./metadata";

export const PoolSchema = z.object({
  metadata: MetadataSchema,
  strategy: EthAddressSchema,
  token: EthAddressSchema,
  maxAmount: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid number.",
  }),
  admins: z.array(EthAddressSchema),
});

export type Pool = z.infer<typeof PoolSchema> & {
  address: Address;
  owner: Address;
  createdAt: Date;
  updatedAt: Date;
  strategy: {
    name: string;
    address: Address;
  };
  token: {
    name: string;
    address: Address;
  };
};
