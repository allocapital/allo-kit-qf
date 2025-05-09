"use client";
import { Page } from "~/components/page";
import { useContracts } from "~/hooks/use-contracts";
import { AllocationForm } from "~/components/allocation/allocation-form";
import { MintTokens } from "~/components/mint-tokens";
import { AllocationFormMatching } from "~/components/allocation/allocation-form-matching";
export default function CheckoutPage() {
  const { SimpleGrants, ERC20Mock } = useContracts();
  return (
    <Page title="Checkout">
      <p className="pb-4 text-lg">Add amounts to fund projects with.</p>
      <AllocationFormMatching
        strategyAddress={SimpleGrants?.address}
        tokenAddress={ERC20Mock?.address}
      />
      <div className="mt-32">
        <MintTokens tokenAddress={ERC20Mock?.address} />
      </div>
    </Page>
  );
}
