import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

export const GET_TASK_FILTERS_QUERY = gql`
  query GET_TASK_FILTERS {
    taskFilters @client {
      category
      status
    }
  }
`

const WithTaskFilters = ({ children, render }) => (
  <Query query={GET_TASK_FILTERS_QUERY}>
    {({ data, loading, errors }) => {
      if (loading || errors) {
        return null
      }
      const { taskFilters } = data
      const filters = taskFilters
      delete filters.__typename
      return render({ filters })
    }}
  </Query>
)

export const withTaskFilters = Component => {
  return class extends React.Component {
    render() {
      return (
        <WithTaskFilters
          render={({ filters }) => {
            return <Component {...this.props} filters={filters} />
          }}
        />
      )
    }
  }
}

export default WithTaskFilters
