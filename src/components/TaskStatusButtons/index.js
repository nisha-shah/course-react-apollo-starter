import React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Button } from "antd"

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      task {
        id
        status
      }
    }
  }
`

const TaskStatusButtons = ({ id, status }) => (
  <Mutation mutation={UPDATE_TASK_MUTATION}>
    {updateTask => {
      return (
        <Button
          style={{ marginLeft: `15px` }}
          icon="save"
          type={status === `INCOMPLETE` ? `danger` : `primary`}
          onClick={() => {
            updateTask({
              variables: {
                id,
                input: {
                  status: status === `INCOMPLETE` ? `COMPLETED` : `INCOMPLETE`,
                },
              },
            })
          }}
        >
          {status === `INCOMPLETE` ? `Mark Completed` : `Mark Incomplete`}
        </Button>
      )
    }}
  </Mutation>
)

export default TaskStatusButtons
