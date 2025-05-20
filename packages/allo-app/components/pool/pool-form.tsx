"use client";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Address } from "viem/accounts";

import { encodeData } from "@se-2/sdk/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useIpfsUpload } from "~/hooks/use-ipfs-upload";
import { ImageUpload } from "~/components/image-upload";
import { PoolSchema } from "~/schemas/pool";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Strategy } from "~/schemas";
import { BalanceCheck } from "~/components/token/balance-check";
import { useDeployStrategy } from "~/components/strategy/use-deploy";
import { parseUnits } from "viem";

type Token = {
  symbol: string;
  address?: string;
  decimals: number;
};
export function PoolForm({
  strategies,
  tokens,
  defaultValues,
  onSuccess,
}: {
  strategies: Strategy[];
  tokens: Token[];
  defaultValues?: Partial<z.infer<typeof PoolSchema>>;
  onSuccess?(value: { poolId: string }): void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof PoolSchema>>({
    resolver: zodResolver(PoolSchema),
    defaultValues,
  });

  const create = useDeployStrategy();
  const upload = useIpfsUpload();
  const isLoading = upload.isPending || create.isPending;
  return (
    <Form {...form}>
      <form
        className="relative space-y-2 mx-auto w-full max-w-(--breakpoint-sm)"
        onSubmit={form.handleSubmit(async (values) => {
          console.log(values);
          const { cid: metadataURI } = await upload.mutateAsync(
            values.metadata
          );
          const strategy = strategies.find(
            (s) => s.address === values.strategy
          );
          const token = tokens.find((t) => t.address === values.token);
          if (!strategy) throw new Error("Strategy not found");
          if (!token) throw new Error("Token not found");

          /*
          TODO: Handle different Strategies with different schemas
          */
          const data = encodeData(strategy.schema, [
            values.token,
            parseUnits(values.maxAmount, token.decimals),
          ]);
          create
            .mutateAsync([strategy.address, metadataURI, data])
            .then((pool) => {
              console.log("created pool", pool);
              router.push(`/dashboard/pools/${pool.strategy}`);
            });
        })}
      >
        <FormField
          control={form.control}
          name="metadata.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pool name</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="Pool name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strategy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strategy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a strategy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {strategies.map((strategy) => (
                    <SelectItem key={strategy.address} value={strategy.address}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata.image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload {...field} upload={upload} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder={"..."} {...field} className="h-48" />
              </FormControl>
              <FormMessage />
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.address} value={token.address}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max amount</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <BalanceCheck>
            <Button isLoading={isLoading} type="submit">
              Create Project
            </Button>
          </BalanceCheck>
        </div>
      </form>
    </Form>
  );
}
