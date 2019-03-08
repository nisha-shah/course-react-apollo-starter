import React from "react"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Button } from "antd"
import { GET_TASK_FILTERS_QUERY, GET_TASKS_QUERY } from "../TaskList"

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      deletedId
    }
  }
`

const DeleteTaskButton = ({ id }) => (
  <Query query={GET_TASK_FILTERS_QUERY}>
    {({ data, loading, errors }) => {
      if (errors || loading) {
          return null
      }
      const { taskFilters } = data
      return (
        <Mutation
          mutation={DELETE_TASK_MUTATION}
          update={(
            cache,
            {
              data: {
                deleteTask: { deletedId },
              },
            }
          ) => {
            const { tasks } = cache.readQuery({
              query: GET_TASKS_QUERY,
              variables: { filters: taskFilters },
            })

            const index = tasks.find(obj => obj.id === deletedId)

            let newTasks = [...tasks]
            newTasks.splice(index, 1)

            cache.writeQuery({
              query: GET_TASKS_QUERY,
              variables: { filters: taskFilters },
              data: {
                tasks: newTasks,
              },
            })
          }}
        >
          {deleteTask => {
            return (
              <Button
                style={{ marginLeft: `15px` }}
                icon="delete"
                type="danger"
                onClick={() => {
                  deleteTask({ variables: { id } })
                }}
              >
                Delete
              </Button>
            )
          }}
        </Mutation>
      )
    }}
  </Query>
)

export default DeleteTaskButton
