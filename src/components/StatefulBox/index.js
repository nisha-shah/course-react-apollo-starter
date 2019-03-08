import React from "react"
import { ApolloConsumer } from "react-apollo"
import gql from "graphql-tag"
import Box from "../Box"
import { withTaskFilters } from "../WithTaskFilters"
import { Tag } from "antd"

const StatefulBox = ({ filters: { category } }) => {
  return (
    <ApolloConsumer>
      {client => {
        const data = category
          ? client.readFragment({
              id: `${category}`,
              fragment: gql`
                fragment CategoryData on Category {
                  name
                  color
                }
              `,
            })
          : null
        return (
          <Box>
            {data ? <Tag color={data.color}>{data.name}</Tag> : `No Data`}
          </Box>
        )
      }}
    </ApolloConsumer>
  )
}

export default withTaskFilters(StatefulBox)
