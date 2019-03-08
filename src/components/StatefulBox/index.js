import React from "react"
import { ApolloConsumer } from "react-apollo"
import gql from "graphql-tag"
import Box from "../Box"
import { withTaskFilters } from '../WithTaskFilters'

const StatefulBox = ({filters: { category }}) => {
  return (
    <ApolloConsumer>
      {client => {
        const data = category ? client.readFragment({
          id: `${category}`,
          fragment: gql`
            fragment CategoryName on Category {
              name
            }
          `,
        }) : null;
        return <Box>{data ? data.name : `No Data`}</Box>
      }}
    </ApolloConsumer>
  )
}

export default withTaskFilters(StatefulBox)
