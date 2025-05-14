"use client";

import gql from "graphql-tag";

import { useQuery } from "@tanstack/react-query";
import { Address, getAddress, isAddress } from "viem";
import { createClient } from "~/lib/graphql";
import { useCurrentChainName } from "./use-current-chain";
import * as chains from "viem/chains";

const gsApiUrl = "https://beta.indexer.gitcoin.co/v1/graphql";

export const GS_PROJECTS_QUERY = gql`
  query GSProjects($where: ProjectsBoolExp) {
    projects(orderBy: [{ createdAtBlock: DESC_NULLS_LAST }], where: $where) {
      id
      createdByAddress
      name
      chainId
      applications(limit: 1, orderBy: [{ createdAtBlock: DESC_NULLS_LAST }]) {
        metadata
      }
    }
  }
`;

export function useGSProjects(searchQuery: string) {
  const network = useCurrentChainName();
  const chainId = Number(chains[network as keyof typeof chains]?.id);
  const client = createClient(gsApiUrl);

  const createdBy = isAddress(searchQuery)
    ? getAddress(searchQuery)
    : undefined;
  const projectName = searchQuery.startsWith("0x") ? undefined : searchQuery;
  return useQuery({
    enabled: !!client && Boolean(createdBy || projectName),
    queryKey: ["gs-projects", { chainId, createdBy, projectName }],
    queryFn: async () => {
      return client
        ?.query<{
          projects: {
            id: string;
            name: string;
            chainId: number;
            createdByAddress: Address;
            applications: { metadata: { project: { logoImg: string } } }[];
          }[];
        }>(GS_PROJECTS_QUERY, {
          where: {
            createdByAddress: {
              _eq: createdBy,
            },
            name: {
              _ilike: `%${projectName}%`,
            },
          },
        })
        .toPromise()
        .then((r) => {
          console.log(r.data);
          if (r.error) throw new Error(r.error.message);
          return r.data?.projects.map((project) => ({
            id: project.id,
            chainId: project.chainId,
            network: Object.values(chains).find(
              (chain) => chain.id === project.chainId
            )?.name,
            name: project.name,
            description:
              project.applications?.[0]?.metadata?.application?.project
                ?.description,
            createdByAddress: project.createdByAddress,
            logoImg: `https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.applications?.[0]?.metadata?.application?.project?.logoImg}`,
            bannerImg: `https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.applications?.[0]?.metadata?.application?.project?.bannerImg}`,
          }));
        });
    },
    refetchInterval: ({ state }) => {
      if (state.data?.length) return 0;

      const retryCount = state.dataUpdateCount - 1;
      const elapsedTime = Date.now() - state.dataUpdatedAt;

      if (retryCount >= 5 || elapsedTime > 10_000) {
        return 0;
      }

      return 1000;
    },
  });
}
