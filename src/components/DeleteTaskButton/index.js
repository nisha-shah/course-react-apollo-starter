import React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Button } from "antd"
import { GET_TASKS_QUERY } from "../TaskList"
import { withTaskFilters } from "../WithTaskFilters"

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      deletedId
    }
  }
`

const DeleteTaskButton = ({ filters, id }) => (
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
        variables: { filters },
      })

      const index = tasks.find(obj => obj.id === deletedId)

      let newTasks = [...tasks]
      newTasks.splice(index, 1)

      cache.writeQuery({
        query: GET_TASKS_QUERY,
        variables: { filters },
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

export default withTaskFilters(DeleteTaskButton)
