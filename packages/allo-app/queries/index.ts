import gql from "graphql-tag";

const META = `
totalCount
pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
}
`;

export const REGISTRATIONS_SCHEMA = gql`
  query Registrations(
    $after: String
    $before: String
    $orderBy: String
    $orderDirection: String
    $limit: Int
    $where: registrationFilter
  ) {
    registrations(
      after: $after
      before: $before
      orderBy: $orderBy
      orderDirection: $orderDirection
      limit: $limit
      where: $where
    ) {
      items {
        id
        chainId
        index
        address
        metadata
        review
        createdAt
        updatedAt
        isApproved    
        allocations {
          items {
            id
            amount
            to
            from
            token
            createdAt
          }
        }
        strategy {
          address
          name
        }
        pool { 
          address
          metadata
        }
      }
      ${META}
    }
  }
`;

export const ALLOCATIONS_SCHEMA = gql`
  query Allocations(
    $after: String
    $before: String
    $orderBy: String
    $orderDirection: String
    $limit: Int
    $where: allocationFilter
  ) {
    allocations(
      after: $after
      before: $before
      orderBy: $orderBy
      orderDirection: $orderDirection
      limit: $limit
      where: $where
    ) {
      items {
        id
        chainId
        amount
        to
        from
        token
        createdAt
        registration {
          address
          metadata
        }
      }
      ${META}
    }
  }
`;

export const POOLS_SCHEMA = gql`
  query Pools(
    $after: String
    $before: String
    $orderBy: String
    $orderDirection: String
    $limit: Int
    $where: poolFilter
  ) {
    pools(
      after: $after
      before: $before
      orderBy: $orderBy
      orderDirection: $orderDirection
      limit: $limit
      where: $where
    ) {
      items {
        chainId
        address
        owner
        metadata
        decodedData
        strategy {
          address
          name
        }
       
      }
      ${META}
    }
  }
`;
