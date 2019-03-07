import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { List } from "antd"
import TaskItem from "../TaskItem"
import { TaskItemFragment } from "../TaskItem"

const GET_TASKS_QUERY = gql`
  query GET_TASKS($filters: TaskFilterInput) {
    tasks(filters: $filters) {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

const TaskList = ({filters}) => {
    console.log( filters );
  return (
    <Query
      query={GET_TASKS_QUERY}
      variables={{filters}}
    >
      {({ data, loading, errors }) => {
        if (errors) {
          console.log(errors)
          return `Errors! ${errors}`
        }
        if (loading) {
          return null;
        }
        if (!data) {
            return null;
        }
        const { tasks } = data;
        return tasks ? (
          <List
            style={{
              background: `white`,
            }}
            loading={loading}
            dataSource={tasks}
            renderItem={task => {
              return (
                <List.Item>
                  <TaskItem task={task} />
                </List.Item>
              )
            }}
          />
        ) : null;
      }}
    </Query>
  )
}

export default TaskList
