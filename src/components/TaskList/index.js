import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { List } from "antd"
import TaskItem from "../TaskItem"
import { TaskItemFragment } from "../TaskItem"

export const GET_TASKS_QUERY = gql`
  query GET_TASKS($filters: TaskFilterInput) {
    tasks(filters: $filters) {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

export const GET_TASK_FILTERS_QUERY = gql`
  query GET_TASK_FILTERS {
    taskFilters @client {
      category
      status
    }
  }
`

const TaskList = () => {
  return (
    <Query query={GET_TASK_FILTERS_QUERY}>
      {({ data, loading, errors }) => {
        if (errors) {
          console.log(errors)
          return `Errors! ${errors}`
        }
        if (loading) {
          return null
        }
        const { taskFilters } = data
        delete taskFilters.__typename

        return (
          <Query
            query={GET_TASKS_QUERY}
            variables={{
              filters: taskFilters
                ? taskFilters
                : { category: null, status: `ALL` },
            }}
          >
            {({ data, loading, errors }) => {
              if (errors) {
                console.log(errors)
                return `Errors! ${errors}`
              }
              if (loading) {
                return null
              }
              const { tasks } = data
              return (
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
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

export default TaskList
