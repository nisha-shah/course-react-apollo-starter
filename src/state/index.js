import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { split, ApolloLink } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { onError } from "apollo-link-error"
import gql from "graphql-tag"
import { RestLink } from "apollo-link-rest"

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010

export const cache = new InMemoryCache({
  dataIdFromObject: object => object.id,
})

const httpLink = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
})

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const restLink = new RestLink({
  uri: "https://swapi.co/api/",
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  webSocketLink,
  ApolloLink.from([restLink, errorLink, httpLink])
)

export const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  resolvers: {
    Mutation: {
      setTaskFilters: (_, { order, sort, id, status }, { cache }) => {
        const data = cache.readQuery({
          query: gql`
            {
              taskFilters @client {
                category
                status
                order
                sort
              }
            }
          `,
        })

        const { taskFiters } = data
        const newFilters = {
          __typename: `TaskFilters`,
        }
        if (id || id === null) {
          newFilters.category = id
        }
        if (status) {
          newFilters.status = status
        }
        if (order) {
          newFilters.order = order
        }
        if (sort) {
          newFilters.sort = sort
        }

        const nextFilters = { ...taskFiters, ...newFilters }

        cache.writeData({ data: { taskFilters: nextFilters } })
        return null
      },
    },
  },
})

cache.writeData({
  data: {
    taskFilters: {
      status: `ALL`,
      category: null,
      order: `desc`,
      sort: `createdDate`,
      __typename: "TaskFilters",
    },
  },
})
