import { Badge } from "./ui/badge";
import {
  chainIdToNetwork,
  useCurrentChainName,
} from "~/hooks/use-current-chain";
export function NetworkBadge({ chainId }: { chainId: number }) {
  //   const network = useCurrentChainName();

  const network = chainIdToNetwork(chainId);
  return <Badge variant="outline">{network?.name}</Badge>;
}
